import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminPanel from "@/app/(manage)/manage/AdminPanel";

export const metadata = {
  title: "Daksham Admin — Manage",
  robots: "noindex, nofollow",
};

export default async function ManagePage() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("payload-token");
  if (!hasToken) redirect("/admin");
  return <AdminPanel />;
}
