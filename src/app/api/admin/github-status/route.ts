import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { checkGithubStatus } from "@/lib/githubSync";

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = await checkGithubStatus();
  return NextResponse.json(status);
}
