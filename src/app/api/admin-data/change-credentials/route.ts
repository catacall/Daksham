import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payloadClient";
import { headers } from "next/headers";

function validatePasswordStrength(pwd: string): { valid: boolean; reason?: string } {
  if (pwd.length < 8) {
    return { valid: false, reason: "Password must be at least 8 characters long." };
  }
  if (!/[A-Z]/.test(pwd)) {
    return { valid: false, reason: "Password must contain at least one uppercase letter." };
  }
  if (!/[a-z]/.test(pwd)) {
    return { valid: false, reason: "Password must contain at least one lowercase letter." };
  }
  if (!/[0-9]/.test(pwd)) {
    return { valid: false, reason: "Password must contain at least one number." };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
    return { valid: false, reason: "Password must contain at least one special character." };
  }
  return { valid: true };
}

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();

    // 1. Verify user session
    const reqHeaders = await headers();
    const { user } = await payload.auth({ headers: reqHeaders });

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized session." }, { status: 401 });
    }

    const { currentPassword, newEmail, newPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json({ error: "Current password is required to update security settings." }, { status: 400 });
    }

    // 2. Verify current password against Payload auth
    try {
      await (payload as any).login({
        collection: "users",
        data: {
          email: user.email,
          password: currentPassword,
        },
      });
    } catch {
      return NextResponse.json({ error: "Current password verification failed." }, { status: 400 });
    }

    const updateData: Record<string, any> = {};

    // 3. Email update validation
    if (newEmail && newEmail.trim() !== user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail.trim())) {
        return NextResponse.json({ error: "Invalid administrator email address format." }, { status: 400 });
      }
      updateData.email = newEmail.trim();
    }

    // 4. Password update validation
    if (newPassword && newPassword.trim()) {
      const passCheck = validatePasswordStrength(newPassword);
      if (!passCheck.valid) {
        return NextResponse.json({ error: passCheck.reason }, { status: 400 });
      }
      updateData.password = newPassword.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: "No credential changes detected." }, { status: 200 });
    }

    // 5. Update user in Payload
    await payload.update({
      collection: "users" as any,
      id: user.id,
      data: updateData,
    });

    console.log(`[Security Audit] Administrator credentials updated for user ID: ${user.id}`);

    return NextResponse.json({
      success: true,
      message: "Security credentials updated successfully.",
      updatedEmail: updateData.email || user.email,
    });
  } catch (err: any) {
    console.error("[POST /api/admin-data/change-credentials] Error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update security credentials." },
      { status: 500 }
    );
  }
}
