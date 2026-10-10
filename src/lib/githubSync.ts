interface GithubCommitOptions {
  filePath: string;
  content: string;
  commitMessage: string;
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
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "nidhins2002/NaplesElectrical";
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token) {
    return {
      success: true,
      committedToGithub: false,
      message: "Saved locally. Add GITHUB_TOKEN to environment variables for live cloud deployments.",
    };
  }

  try {
    // 1. Get current file SHA from GitHub API
    let fileSha: string | undefined;
    const getRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "NaplesElectrical-Admin-CMS",
        },
        cache: "no-store",
      }
    );

    if (getRes.ok) {
      const getData = await getRes.json();
      fileSha = getData.sha;
    }

    // 2. Put file to GitHub
    const base64Content = Buffer.from(content).toString("base64");
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
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
        message: `GitHub commit failed: ${errData.message || putRes.statusText}`,
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
