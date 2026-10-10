import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { commitFileToGithub } from "@/lib/githubSync";

const CONFIG_FILE = path.join(process.cwd(), "src/data/siteConfig.json");

function readConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading siteConfig.json:", err);
    return {};
  }
}

function writeConfig(config: Record<string, unknown>) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8");
  } catch (err) {
    console.warn("Local file write skipped (read-only environment):", err);
  }
}

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = readConfig();
  return NextResponse.json({ config });
}

export async function POST(req: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedConfig = await req.json();
    const current = readConfig();
    const merged = { ...current, ...updatedConfig };
    const updatedJsonString = JSON.stringify(merged, null, 2);
    writeConfig(merged);

    // Commit to GitHub repository
    const gitSync = await commitFileToGithub({
      filePath: "src/data/siteConfig.json",
      content: updatedJsonString,
      commitMessage: "cms: update company site settings via admin portal",
    });

    return NextResponse.json({
      success: true,
      config: merged,
      gitSync,
    });
  } catch (err) {
    console.error("Error saving site config:", err);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}
