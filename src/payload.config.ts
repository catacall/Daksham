
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { SiteSettings } from "./collections/globals/SiteSettings";
import { Pages } from "./collections/pages";
import { Enquiries } from "./collections/Enquiries";
import { Projects } from "./collections/Projects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [SiteSettings],
  collections: [Users, Media , Pages , Enquiries, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  // plugins: [
  //   cloudinaryPlugin({
  //     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  //     apiKey: process.env.CLOUDINARY_API_KEY,
  //     apiSecret: process.env.CLOUDINARY_API_SECRET,
  //   })
  // ],
});


// function cloudinaryPlugin(_arg0: { cloudName: string | undefined; apiKey: string | undefined; apiSecret: string | undefined; }): import("payload").Plugin {
//   throw new Error("Function not implemented.");
// }

