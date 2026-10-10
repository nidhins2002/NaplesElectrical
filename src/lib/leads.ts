import fs from "fs";
import path from "path";

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

export function getLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const data = fs.readFileSync(LEADS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading leads:", err);
    return [];
  }
}

export function saveLead(leadData: Omit<Lead, "id" | "status">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...leadData,
    status: "new",
  };
  leads.unshift(newLead);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving lead:", err);
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: "new" | "contacted" | "completed"): boolean {
  const leads = getLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return false;
  lead.status = status;
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error updating lead status:", err);
    return false;
  }
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error deleting lead:", err);
    return false;
  }
}
