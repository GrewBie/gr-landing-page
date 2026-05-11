import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: "demo" | "brand-cure" | "general";
  message?: string;
  source: string;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function saveLead(lead: Lead): void {
  try {
    ensureFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const leads: Lead[] = JSON.parse(raw);
    leads.unshift(lead); // newest first
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("[leads] Failed to save lead to file:", err);
  }
}

export function readLeads(): Lead[] {
  try {
    ensureFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function leadsToCSV(leads: Lead[]): string {
  const headers = ["id", "name", "email", "phone", "company", "interest", "message", "source", "createdAt"];
  const rows = leads.map((l) =>
    headers.map((h) => `"${String(l[h as keyof Lead] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}
