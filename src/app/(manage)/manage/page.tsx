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
  if (isFrontendMockMode) {
    return <AdminPanel user={{ id: "mock-id", email: "anassayyed000@gmail.com" }} />;
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    redirect("/manage/login");
  }

  const allowedEmailsEnv = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "anassayyed000@gmail.com";
  const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());

  if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    redirect("/manage/login?error=unauthorized");
  }

  return <AdminPanel user={{ id: String(user.id), email: user.email }} />;
}
