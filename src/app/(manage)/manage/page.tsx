import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPayloadClient, isFrontendMockMode } from "@/lib/payloadClient";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Daksham Admin — Manage",
  robots: "noindex, nofollow",
};

export default async function ManagePage() {
  // In mock mode (no DB), the admin console cannot function.
  // Never grant admin access without real authentication.
  if (isFrontendMockMode) {
    return (
      <div className="min-h-screen bg-[#0B0C0C] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <p className="text-[#D4AF37] font-display text-2xl uppercase tracking-wider">Manage Console</p>
          <p className="text-white/60 font-sans text-sm leading-relaxed">
            The admin console requires a live database connection.<br />
            Please ensure <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> and{" "}
            <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-xs">PAYLOAD_SECRET</code> are set in your Vercel environment variables.
          </p>
          <a href="/" className="inline-block mt-4 text-xs text-white/40 hover:text-white/70 underline transition-colors">
            Return to Website
          </a>
        </div>
      </div>
    );
  }

  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: await headers() });

    if (!user) {
      redirect("/manage/login");
    }

    const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "";
    if (allowedEmailsEnv.trim()) {
      const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());
      if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
        redirect("/manage/login?error=unauthorized");
      }
    } else if (!user.email) {
      redirect("/manage/login?error=unauthorized");
    }

    return <AdminPanel user={{ id: String(user.id), email: user.email }} />;
  } catch {
    redirect("/manage/login");
  }
}
