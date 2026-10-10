import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/leads";

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(req: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !["new", "contacted", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status or id" }, { status: 400 });
    }

    const success = updateLeadStatus(id, status);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error updating lead status:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const success = deleteLead(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting lead:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
