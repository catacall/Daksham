
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
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';import { resendAdapter } from "@payloadcms/email-resend";
// Prevent leaking connection pools during Next.js hot reloading in development.
const CachedPool = function (this: any, options: any) {
  const globalVar = globalThis as any;
  if (!globalVar.payloadDbPool) {
    globalVar.payloadDbPool = new pg.Pool(options);
  }
  return globalVar.payloadDbPool;
} as any;

CachedPool.prototype = pg.Pool.prototype;

const customPg = {
  ...pg,
  Pool: CachedPool,
};

// Always route through Neon's transaction pooler at runtime.
// Each Vercel serverless instance creates its own pg.Pool; without pooling
// multiple concurrent instances can exhaust Neon's 15-session limit.
function getPoolerConnectionString(): string {
  const url = process.env.DATABASE_URL || "";
  if (url.includes("neon.tech") && !url.includes("-pooler")) {
    return url.replace(/@(ep-[^.\/:]+)/, "@$1-pooler");
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
  secret: process.env.PAYLOAD_SECRET || "",
  plugins: [
    vercelBlobStorage({
      // DISABLED — the Vercel Blob store is configured as "private" which
      // blocks public uploads. More importantly, the plugin's afterRead hook
      // was overriding the stored Cloudinary URLs in the media table with
      // local /api/media/file/{filename} paths, causing 404s everywhere.
      // All uploads now go through our custom /api/admin-data/upload route
      // which posts directly to Cloudinary and stores the permanent CDN URL.
      enabled: false,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),

  ],

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pg: customPg,
    pool: {
      connectionString: getPoolerConnectionString(),
      max: 3,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000,
    },
  }),

  sharp,




  email: resendAdapter({
    defaultFromAddress: 'dev@payloadcms.com',
    defaultFromName: 'Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

});
