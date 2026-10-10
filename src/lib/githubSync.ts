import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface GithubCommitOptions {
  filePath: string;
  content: string;
  commitMessage: string;
}

export async function checkGithubStatus(): Promise<{
  mode: "api" | "local-cli" | "disconnected";
  repo: string;
  branch: string;
  hasToken: boolean;
  isLocalGit: boolean;
  message: string;
}> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim() || "nidhins2002/NaplesElectrical";
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";
  const gitDir = path.join(process.cwd(), ".git");
  const isLocalGit = fs.existsSync(gitDir);

  if (token) {
    return {
      mode: "api",
      repo,
      branch,
      hasToken: true,
      isLocalGit,
      message: `Connected via GitHub API to ${repo} (${branch})`,
    };
  }

  if (isLocalGit) {
    return {
      mode: "local-cli",
      repo,
      branch,
      hasToken: false,
      isLocalGit: true,
      message: "Local Git mode active: Edits will automatically git commit & push to GitHub",
    };
  }

  return {
    mode: "disconnected",
    repo,
    branch,
    hasToken: false,
    isLocalGit: false,
    message: "GITHUB_TOKEN is missing on Vercel. Live cloud commits are disabled.",
  };
}

async function tryLocalGitCommitAndPush(filePath: string, commitMessage: string) {
  try {
    const gitDir = path.join(process.cwd(), ".git");
    if (!fs.existsSync(gitDir)) {
      return { success: false, error: "Not a local git repository" };
    }

    // 1. Stage file
    await execAsync(`git add "${filePath}"`);

    // 2. Check if there are staged differences
    const { stdout: diffOut } = await execAsync(`git diff --staged --name-only "${filePath}"`);
    if (!diffOut.trim()) {
      return {
        success: true,
        message: "File was saved locally. No new changes detected compared to Git HEAD.",
      };
    }

    // 3. Commit
    const sanitizedMsg = commitMessage.replace(/"/g, '\\"');
    await execAsync(`git commit -m "${sanitizedMsg}"`);

    // 4. Push to origin main
    await execAsync(`git push origin main`);

    return {
      success: true,
      message: "Successfully committed & pushed to GitHub! Vercel is now building and deploying.",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Local Git Sync Error:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

export async function commitFileToGithub({
  filePath,
  content,
  commitMessage,
}: GithubCommitOptions): Promise<{
  success: boolean;
  committedToGithub: boolean;
  message: string;
}> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim() || "nidhins2002/NaplesElectrical";
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";

  // If GITHUB_TOKEN is not provided:
  if (!token) {
    // If in a local dev environment with git access, commit & push directly!
    const localResult = await tryLocalGitCommitAndPush(filePath, commitMessage);
    if (localResult.success) {
      return {
        success: true,
        committedToGithub: true,
        message: localResult.message || "Successfully committed and pushed to GitHub via local Git!",
      };
    }

    // In production (Vercel) without token or local git push failed
    return {
      success: false,
      committedToGithub: false,
      message: localResult.error
        ? `Local Git push failed: ${localResult.error}`
        : "GITHUB_TOKEN is missing in environment variables. Edits cannot be pushed to GitHub or the live site until you add GITHUB_TOKEN to your Vercel project settings.",
    };
  }

  // If GITHUB_TOKEN is provided, use GitHub REST API (works in Vercel & serverless)
  try {
    // 1. Get current file SHA from GitHub API
    let fileSha: string | undefined;
    const getRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "NaplesElectrical-Admin-CMS",
        },
        cache: "no-store",
      }
    );

    if (getRes.ok) {
      const getData = await getRes.json();
      fileSha = getData.sha;
    } else if (getRes.status === 401 || getRes.status === 403) {
      const errData = await getRes.json().catch(() => ({}));
      return {
        success: false,
        committedToGithub: false,
        message: `GitHub Token Error (${getRes.status}): ${errData.message || "Invalid or unauthorized GITHUB_TOKEN. Check repo permissions."}`,
      };
    }

    // 2. Put file to GitHub
    const base64Content = Buffer.from(content).toString("base64");
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "NaplesElectrical-Admin-CMS",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          sha: fileSha,
          branch,
        }),
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      console.error("GitHub API Commit Error:", errData);
      return {
        success: false,
        committedToGithub: false,
        message: `GitHub commit failed (${putRes.status}): ${errData.message || putRes.statusText}`,
      };
    }

    return {
      success: true,
      committedToGithub: true,
      message: "Successfully committed to GitHub! Vercel will automatically redeploy the changes.",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("GitHub Sync Error:", err);
    return {
      success: false,
      committedToGithub: false,
      message: `Failed to commit to GitHub: ${errorMsg}`,
    };
  }
}
