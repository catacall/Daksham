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
    redirect("/admin");
  }

  return <AdminPanel />;
}
