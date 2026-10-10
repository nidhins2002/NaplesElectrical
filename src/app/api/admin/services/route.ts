import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { ServiceData } from "@/lib/services";
import { commitFileToGithub } from "@/lib/githubSync";

const SERVICES_FILE = path.join(process.cwd(), "src/data/services.json");

function readServices(): ServiceData[] {
  try {
    const raw = fs.readFileSync(SERVICES_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading services.json:", err);
    return [];
  }
}

function writeServices(services: ServiceData[]): void {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2), "utf8");
  } catch (err) {
    console.warn("Local file write skipped (read-only environment):", err);
  }
}

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = readServices();
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedService: ServiceData = await req.json();

    if (!updatedService.slug || !updatedService.title) {
      return NextResponse.json({ error: "Service slug and title are required" }, { status: 400 });
    }

    const services = readServices();
    const index = services.findIndex((s) => s.slug === updatedService.slug);

    if (index >= 0) {
      services[index] = { ...services[index], ...updatedService };
    } else {
      services.push(updatedService);
    }

    const updatedJsonString = JSON.stringify(services, null, 2);
    writeServices(services);

    // Commit to GitHub repository
    const gitSync = await commitFileToGithub({
      filePath: "src/data/services.json",
      content: updatedJsonString,
      commitMessage: `cms: update service "${updatedService.title}" via admin portal`,
    });

    if (!gitSync.committedToGithub) {
      return NextResponse.json(
        {
          success: false,
          error: gitSync.message,
          service: updatedService,
          gitSync,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      service: updatedService,
      gitSync,
    });
  } catch (err) {
    console.error("Error updating service:", err);
    return NextResponse.json({ error: "Failed to save service" }, { status: 500 });
  }
}
