import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  projectInterestedIn: z.string().optional().nullable(),
  message: z.string().min(10),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const validatedData = enquirySchema.parse(body);

    const payload = await getPayload({ config: configPromise });

    // Save to Database
    const newEnquiry = await payload.create({
      collection: "enquiries" as any,
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        projectInterestedIn: validatedData.projectInterestedIn || null,
        message: validatedData.message,
        source: validatedData.source,
        status: "new",
      },
    });

    // Send Admin Notification Email via Resend
    // We wrap this in a try/catch so email failure doesn't block lead capture
    try {
      if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL) {
        await resend.emails.send({
          from: "Enquiry Bot <onboarding@resend.dev>", // Replace with verified domain in production
          to: process.env.ADMIN_NOTIFICATION_EMAIL,
          subject: `New Enquiry from ${validatedData.name}`,
          html: `
            <h2>New Website Enquiry</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Message:</strong> ${validatedData.message}</p>
          `,
        });
      } else {
        console.warn("Skipping email notification: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not set.");
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Lead is already captured, so we proceed to return success.
    }

    return NextResponse.json(
      { message: "Enquiry submitted successfully.", id: newEnquiry.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodErr = error as any;
      return NextResponse.json(
        { message: "Validation failed.", errors: zodErr.errors || zodErr.issues },
        { status: 400 }
      );
    }

    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your enquiry." },
      { status: 500 }
    );
  }
}