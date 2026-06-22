import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import AdminPanel from "./AdminPanel";

export const metadata = {
  title: "Daksham Admin — Manage",
  robots: "noindex, nofollow",
};

export default async function ManagePage() {
  const payload = await getPayload({ config: configPromise });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    redirect("/manage/login");
  }

  const allowedEmailsEnv = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "anassayyed000@gmail.com";
  const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());

  if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    redirect("/manage/login?error=unauthorized");
  }

  return <AdminPanel />;
}
