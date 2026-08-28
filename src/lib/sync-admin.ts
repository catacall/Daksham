import { getPayload } from "payload";
import configPromise from "../payload.config";

async function main() {
  console.log("[Sync Admin] Initializing Payload...");
  const payload = await getPayload({ config: configPromise });

  const email = "dakshambuilders@gmail.com";
  const password = "daksham@2027";

  console.log(`[Sync Admin] Checking existing user for ${email}...`);
  const existingUsers = await payload.find({
    collection: "users" as any,
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (existingUsers.totalDocs > 0) {
    const userDoc = existingUsers.docs[0];
    console.log(`[Sync Admin] User ${email} exists (ID: ${userDoc.id}). Updating password...`);
    await payload.update({
      collection: "users" as any,
      id: userDoc.id,
      data: {
        password: password,
      },
    });
    console.log(`[Sync Admin] Password updated successfully for ${email}.`);
  } else {
    console.log(`[Sync Admin] Creating new admin user ${email}...`);
    await payload.create({
      collection: "users" as any,
      data: {
        email: email,
        password: password,
      },
    });
    console.log(`[Sync Admin] Admin user ${email} created successfully.`);
  }

  // Also remove old temporary user if it exists
  const oldUsers = await payload.find({
    collection: "users" as any,
    where: {
      email: {
        equals: "anassayyed000@gmail.com",
      },
    },
  });

  if (oldUsers.totalDocs > 0) {
    for (const u of oldUsers.docs) {
      console.log(`[Sync Admin] Removing old user anassayyed000@gmail.com (ID: ${u.id})...`);
      await payload.delete({
        collection: "users" as any,
        id: u.id,
      });
    }
  }

  console.log("[Sync Admin] Done!");
  process.exit(0);
}

main().catch((err) => {
  console.error("[Sync Admin] Error:", err);
  process.exit(1);
});
