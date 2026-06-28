import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
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
    const payload = await getPayload({ config });

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
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f0f4f8; border-radius: 16px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #0a1628, #122240); padding: 32px 24px; text-align: center;">
                <h1 style="color: #d4af37; font-size: 24px; margin: 0 0 8px 0; letter-spacing: 2px; text-transform: uppercase;">
                  New Website Enquiry
                </h1>
                <p style="color: #8a9bb5; font-size: 14px; margin: 0;">
                  Received on ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div style="padding: 32px 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px; vertical-align: top;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px; font-weight: 600;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px;">
                      <a href="mailto:${data.email}" style="color: #00a8cc; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px;">
                      <a href="tel:${data.phone}" style="color: #00a8cc; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Project</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #d4af37; font-size: 16px; font-weight: 600;">${projectTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Source</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 14px;">${data.source}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #0a1628; font-size: 15px; line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
              <div style="background: #0a1628; padding: 20px 24px; text-align: center;">
                <p style="color: #8a9bb5; font-size: 12px; margin: 0;">
                  Saved to the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/manage" style="color: #00d4ff; text-decoration: none;">Manage Dashboard</a>
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
