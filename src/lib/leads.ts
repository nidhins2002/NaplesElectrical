import fs from "fs";
import path from "path";
import { commitFileToGithub } from "./githubSync";

const LEADS_FILE = path.join(process.cwd(), "src/data/leads.json");

export interface Lead {
  id: string;
  timestamp: string;
  service: string;
  propertyType: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  details: string;
  status: "new" | "contacted" | "completed";
}

export async function getLeads(): Promise<Lead[]> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim() || "nidhins2002/NaplesElectrical";
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";

  // In cloud environment with GITHUB_TOKEN: fetch live leads directly from GitHub API
  if (token) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/src/data/leads.json?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "NaplesElectrical-CMS",
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const data = await res.json();
        const content = Buffer.from(data.content, "base64").toString("utf8");
        return JSON.parse(content);
      }
    } catch (err) {
      console.error("Error reading leads from GitHub API:", err);
    }
  }

  // Local filesystem fallback (local dev)
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const data = fs.readFileSync(LEADS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading local leads file:", err);
    return [];
  }
}

export async function saveLead(leadData: Omit<Lead, "id" | "status">): Promise<Lead> {
  const leads = await getLeads();
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...leadData,
    status: "new",
  };
  leads.unshift(newLead);
  const jsonString = JSON.stringify(leads, null, 2);

  // 1. Try local write (works in local dev)
  try {
    fs.writeFileSync(LEADS_FILE, jsonString, "utf8");
  } catch (err) {
    console.warn("Local leads file write skipped (read-only environment):", err);
  }

  // 2. Commit to GitHub with [skip ci] so Vercel does NOT trigger a site rebuild!
  try {
    await commitFileToGithub({
      filePath: "src/data/leads.json",
      content: jsonString,
      commitMessage: `lead: new inquiry from ${newLead.name} [skip ci]`,
    });
  } catch (gitErr) {
    console.error("Failed to commit lead to GitHub:", gitErr);
  }

  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "completed"
): Promise<boolean> {
  const leads = await getLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return false;
  lead.status = status;
  const jsonString = JSON.stringify(leads, null, 2);

  try {
    fs.writeFileSync(LEADS_FILE, jsonString, "utf8");
  } catch (err) {
    console.warn("Local leads file write skipped:", err);
  }

  try {
    await commitFileToGithub({
      filePath: "src/data/leads.json",
      content: jsonString,
      commitMessage: `lead: update status to ${status} for ${lead.name} [skip ci]`,
    });
  } catch (gitErr) {
    console.error("Failed to commit lead status update to GitHub:", gitErr);
  }

  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  const jsonString = JSON.stringify(filtered, null, 2);

  try {
    fs.writeFileSync(LEADS_FILE, jsonString, "utf8");
  } catch (err) {
    console.warn("Local leads file write skipped:", err);
  }

  try {
    await commitFileToGithub({
      filePath: "src/data/leads.json",
      content: jsonString,
      commitMessage: `lead: delete inquiry ${id} [skip ci]`,
    });
  } catch (gitErr) {
    console.error("Failed to commit lead deletion to GitHub:", gitErr);
  }

  return true;
}
