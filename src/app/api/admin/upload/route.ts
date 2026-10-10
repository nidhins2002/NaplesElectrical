import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { commitFileToGithub } from "@/lib/githubSync";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string | null) || "service";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image file size exceeds 5MB limit. Please choose a smaller image." },
        { status: 400 }
      );
    }

    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const cleanSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() || "service";
    const filename = `${cleanSlug}-${Date.now()}.${ext}`;
    const relativeFilePath = `public/images/uploads/${filename}`;
    const publicUrl = `/images/uploads/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Write locally if directory is accessible
    try {
      const uploadDir = path.join(process.cwd(), "public/images/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
    } catch (writeErr) {
      console.warn("Local file write skipped (read-only environment):", writeErr);
    }

    // 2. Commit binary file to GitHub / Local Git
    const gitSync = await commitFileToGithub({
      filePath: relativeFilePath,
      content: buffer,
      commitMessage: `cms: upload image "${filename}" for service ${cleanSlug}`,
    });

    if (!gitSync.committedToGithub) {
      return NextResponse.json(
        {
          success: false,
          error: gitSync.message,
          gitSync,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      gitSync,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Image upload failed";
    console.error("Upload error:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
