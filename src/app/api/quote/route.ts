import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      service,
      propertyType,
      urgency,
      name,
      phone,
      email,
      address,
      details,
    } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Cleaned payload
    const lead = {
      timestamp: new Date().toISOString(),
      service: String(service || "General Electrical").slice(0, 150),
      propertyType: String(propertyType || "Residential").slice(0, 50),
      urgency: String(urgency || "Normal").slice(0, 100),
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      email: (email ? String(email).trim() : "").slice(0, 100),
      address: (address ? String(address).trim() : "").slice(0, 200),
      details: (details ? String(details).trim() : "").slice(0, 1000),
    };

    // Log the lead clearly for server inspection
    console.log("⚡ [NEW ESTIMATE LEAD RECEIVED]:", JSON.stringify(lead, null, 2));

    // Optional webhook notification if configured (e.g., Slack, Discord, Zapier, Make)
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `⚡ *New Naples Electrical Lead!*
*Name:* ${lead.name}
*Phone:* ${lead.phone}
*Email:* ${lead.email || "N/A"}
*Service:* ${lead.service}
*Property:* ${lead.propertyType}
*Urgency:* ${lead.urgency}
*Address:* ${lead.address || "N/A"}
*Details:* ${lead.details || "None provided"}`,
          }),
        });
      } catch (err) {
        console.error("Failed to forward lead to webhook:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing quote request:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
