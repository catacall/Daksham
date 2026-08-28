
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pg from "pg";
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { SiteSettings } from "@/collections/globals/SiteSettings";
import { Enquiries } from "@/collections/Enquiries";
import { Projects } from "@/collections/Projects";
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { resendAdapter } from "@payloadcms/email-resend";
import { seedDatabase } from "@/lib/seed";
// Always route through transactional pooler at runtime to prevent connection exhaustion.
// For Neon: appends -pooler.
// For Supabase: switches port 5432 to 6543.
function getPoolerConnectionString(): string {
  let url = process.env.DATABASE_URL || "";
  
  if (url.includes("neon.tech") && !url.includes("-pooler")) {
    url = url.replace(/@(ep-[^.\/:]+)/, "@$1-pooler");
  }

  if (url.includes("supabase.com") && url.includes(":5432")) {
    url = url.replace(":5432", ":6543");
  }
  
  return url;
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,

    // ── Branding ──────────────────────────────────
    meta: {
      titleSuffix: "— Daksham Admin",
      // favicon: '/favicon.ico', // uncomment if you have one at /public/favicon.ico
    },

    // ── Custom Dashboard ──────────────────────────
    components: {
      views: {
        dashboard: {
          Component: "/app/(payload)/admin/Dashboard#default",
        },
      },
    },

    // ── Force light theme ─────────────────────────
    theme: "light",

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  globals: [SiteSettings],
  collections: [Users, Media, Enquiries, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "temp-build-secret-key-12345",
  plugins: [
    vercelBlobStorage({
      // Enable on Vercel so Payload never warns about missing storage adapters.
      // VERCEL env var is always set by the Vercel platform at both build & runtime.
      enabled: Boolean(process.env.VERCEL),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),

  ],

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: getPoolerConnectionString(),
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }),

  sharp,

  email: resendAdapter({
    defaultFromAddress: 'info@dakshamdevelopers.com',
    defaultFromName: 'Daksham Developers',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  onInit: async () => {},
});
