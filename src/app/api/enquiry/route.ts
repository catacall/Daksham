import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function validateBody(body: any): { ok: true; data: any } | { ok: false; error: string } {
  const { name, email, phone, message, projectInterestedIn, source } = body ?? {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, error: "Name must be at least 2 characters." };
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
    return { ok: false, error: "Phone must be at least 7 characters." };
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    return { ok: false, error: "Message must be at least 5 characters." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      projectInterestedIn: projectInterestedIn ?? null,
      source: (typeof source === "string" ? source.trim() : null) || "website",
    },
  };
}

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateBody(body);
  if (!validation.ok) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  const data = validation.data;

  try {
    const payload = await getPayloadClient();

    // Resolve project title for the email notification
    let projectTitle = "Not specified";
    let projectRelationId: number | null = null;

    if (data.projectInterestedIn) {
      const rawId = data.projectInterestedIn;
      const numId = parseInt(String(rawId), 10);

      if (!isNaN(numId)) {
        try {
          const project = await payload.findByID({
            collection: "projects" as any,
            id: numId,
          });
          if (project && (project as any).title) {
            projectTitle = (project as any).title;
            projectRelationId = numId;
          }
        } catch {
          // Project not found — skip relation, still capture the lead
        }
      }
    }

    // Save enquiry to database
    const newEnquiry = await payload.create({
      collection: "enquiries" as any,
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectInterestedIn: projectRelationId,
        message: data.message,
        source: data.source,
        status: "new",
      },
    });

    // Send admin notification email — failure does NOT block lead capture
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;
    const emailFrom = process.env.EMAIL_FROM || "Enquiry Bot <onboarding@resend.dev>";

    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder" && adminEmail) {
        await resend.emails.send({
          from: emailFrom,
          to: adminEmail,
          subject: `🏠 New Enquiry from ${data.name}`,
          html: `
            <div style="font-family: 'Outfit', 'Inter', 'Segoe UI', Arial, sans-serif; background-color: #0A111E; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 24px; border: 1px solid rgba(212, 175, 55, 0.15); color: #f3f4f6;">
              <!-- Header Section -->
              <div style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                <h1 style="color: #D4AF37; font-size: 26px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: 2px; text-transform: uppercase;">
                  New Enquiry
                </h1>
                <p style="color: #9CA3AF; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                  Received on ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              
              <!-- Info Table -->
              <div style="padding: 30px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 120px; font-weight: 600;">Name</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #ffffff; font-size: 15px; font-weight: 600;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Email</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #D4AF37; font-size: 15px;">
                      <a href="mailto:${data.email}" style="color: #D4AF37; text-decoration: none; border-bottom: 1px dashed rgba(212, 175, 55, 0.5);">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Phone</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #ffffff; font-size: 15px; font-weight: 600;">
                      <a href="tel:${data.phone}" style="color: #ffffff; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Project</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #D4AF37; font-size: 15px; font-weight: 600; letter-spacing: 0.5px;">${projectTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Source</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #9CA3AF; font-size: 14px;">${data.source}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; vertical-align: top; font-weight: 600; padding-top: 20px;">Message</td>
                    <td style="padding: 16px 0; color: #f3f4f6; font-size: 14px; line-height: 1.6; padding-top: 20px; font-style: italic;">"${data.message.replace(/\n/g, "<br>")}"</td>
                  </tr>
                </table>
              </div>
              
              <!-- Footer Link -->
              <div style="background-color: rgba(212, 175, 55, 0.05); border-radius: 12px; padding: 16px; text-align: center; border: 1px solid rgba(212, 175, 55, 0.1);">
                <p style="color: #9CA3AF; font-size: 12px; margin: 0; font-weight: 500;">
                  Saved to the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://dakshamdevelopers.com"}/manage" style="color: #D4AF37; text-decoration: none; font-weight: bold; border-bottom: 1px solid #D4AF37;">Manage Dashboard</a>
                </p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.warn("[enquiry] Email notification failed (lead still captured):", emailError);
    }

    return NextResponse.json(
      { message: "Enquiry submitted successfully.", id: newEnquiry.id },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[POST /api/enquiry] Database error:", error);
    return NextResponse.json(
      { message: `Failed to save enquiry: ${error?.message || "Unknown database error"}` },
      { status: 500 },
    );
  }
}
