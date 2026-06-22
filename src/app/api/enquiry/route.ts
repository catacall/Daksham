/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  projectInterestedIn: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation
    const validatedData = enquirySchema.parse(body);

    const payload = await getPayload({ config: configPromise });

    // Resolve project title if an ID was provided
    let projectTitle = "Not specified";
    if (validatedData.projectInterestedIn) {
      try {
        const project = await payload.findByID({
          // Use a permissive cast for collections not present in Payload's generated types
          collection: "projects" as any,
          id: validatedData.projectInterestedIn,
        });
        if (project?.title) {
          projectTitle = project.title;
        }
      } catch {
        // If project lookup fails, use the raw value
        projectTitle = validatedData.projectInterestedIn;
      }
    }

    // Save to Payload CMS Database
    // Cast data to any to satisfy Payload's collection typings when fields
    // may not exactly match the generated types (e.g. 'phone' field).
    const newEnquiry = await payload.create({
      // Use a permissive cast for collections not present in Payload's generated types
      collection: "enquiries" as any,
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        projectInterestedIn: validatedData.projectInterestedIn || null,
        message: validatedData.message,
        source: validatedData.source,
        status: "new",
      } as any,
    });

    // Send Admin Notification Email via Resend
    // Email failure doesn't block lead capture
    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;
    const emailFrom =
      process.env.EMAIL_FROM || "Enquiry Bot <onboarding@resend.dev>";

    try {
      if (process.env.RESEND_API_KEY && adminEmail) {
        await resend.emails.send({
          from: emailFrom,
          to: adminEmail,
          subject: `🏠 New Enquiry from ${validatedData.name}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f0f4f8; border-radius: 16px; overflow: hidden;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0a1628, #122240); padding: 32px 24px; text-align: center;">
                <h1 style="color: #d4af37; font-size: 24px; margin: 0 0 8px 0; letter-spacing: 2px; text-transform: uppercase;">
                  New Website Enquiry
                </h1>
                <p style="color: #8a9bb5; font-size: 14px; margin: 0;">
                  Received on ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              
              <!-- Body -->
              <div style="padding: 32px 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px; vertical-align: top;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px; font-weight: 600;">${validatedData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px;">
                      <a href="mailto:${validatedData.email}" style="color: #00a8cc; text-decoration: none;">${validatedData.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 16px;">
                      <a href="tel:${validatedData.phone}" style="color: #00a8cc; text-decoration: none;">${validatedData.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Project</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #d4af37; font-size: 16px; font-weight: 600;">${projectTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Source</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #d4dde8; color: #0a1628; font-size: 14px;">${validatedData.source}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #8a9bb5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #0a1628; font-size: 15px; line-height: 1.6;">${validatedData.message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Footer -->
              <div style="background: #0a1628; padding: 20px 24px; text-align: center;">
                <p style="color: #8a9bb5; font-size: 12px; margin: 0;">
                  This enquiry has been saved to the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/collections/enquiries" style="color: #00d4ff; text-decoration: none;">Payload Admin Panel</a>
                </p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      // Lead is already captured, so we proceed to return success.
    }

    return NextResponse.json(
      { message: "Enquiry submitted successfully.", id: newEnquiry.id },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodErr = error as any;
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: zodErr.errors || zodErr.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "An error occurred while processing your enquiry." },
      { status: 500 },
    );
  }
}
