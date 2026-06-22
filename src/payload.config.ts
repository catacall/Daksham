
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pg from "pg";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { SiteSettings } from "./collections/globals/SiteSettings";
import { Pages } from "./collections/pages";
import { Enquiries } from "./collections/Enquiries";
import { Projects } from "./collections/Projects";

// Prevent leaking connection pools during Next.js hot reloading in development.
const CachedPool = function (this: any, options: any) {
  if (process.env.NODE_ENV === "development") {
    const globalVar = globalThis as any;
    if (!globalVar.payloadDbPool) {
      globalVar.payloadDbPool = new pg.Pool(options);
    }
    return globalVar.payloadDbPool;
  }
  return new pg.Pool(options);
} as any;

CachedPool.prototype = pg.Pool.prototype;

const customPg = {
  ...pg,
  Pool: CachedPool,
};

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
  collections: [Users, Media, Pages, Enquiries, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pg: customPg,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: 4,
    },
  }),

  sharp,
});
