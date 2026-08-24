CREATE TABLE IF NOT EXISTS "media" (
  "id" serial NOT NULL PRIMARY KEY,
  "alt" varchar,
  "cloudinary_url" varchar,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "url" varchar,
  "thumbnail_u_r_l" varchar,
  "filename" varchar,
  "mime_type" varchar,
  "filesize" numeric,
  "width" numeric,
  "height" numeric,
  "focal_x" numeric,
  "focal_y" numeric,
  "sizes_thumbnail_url" varchar,
  "sizes_thumbnail_width" numeric,
  "sizes_thumbnail_height" numeric,
  "sizes_thumbnail_mime_type" varchar,
  "sizes_thumbnail_filesize" numeric,
  "sizes_thumbnail_filename" varchar,
  "sizes_card_url" varchar,
  "sizes_card_width" numeric,
  "sizes_card_height" numeric,
  "sizes_card_mime_type" varchar,
  "sizes_card_filesize" numeric,
  "sizes_card_filename" varchar,
  "sizes_large_url" varchar,
  "sizes_large_width" numeric,
  "sizes_large_height" numeric,
  "sizes_large_mime_type" varchar,
  "sizes_large_filesize" numeric,
  "sizes_large_filename" varchar
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" serial NOT NULL PRIMARY KEY,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "email" varchar NOT NULL,
  "reset_password_token" varchar,
  "reset_password_expiration" timestamp(3) with time zone,
  "salt" varchar,
  "hash" varchar,
  "login_attempts" numeric DEFAULT 0,
  "lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "enquiries" (
  "id" serial NOT NULL PRIMARY KEY,
  "name" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "email" varchar NOT NULL,
  "source" varchar DEFAULT 'website',
  "project_interested_in_id" integer,
  "message" varchar NOT NULL,
  "status" enum_enquiries_status NOT NULL DEFAULT 'new',
  "follow_up_date" timestamp(3) with time zone,
  "notes" varchar,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  FOREIGN KEY ("project_interested_in_id") REFERENCES "projects"("id")
);

CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" serial NOT NULL PRIMARY KEY,
  "site_name" varchar NOT NULL DEFAULT 'My website',
  "logo_id" integer,
  "favicon_id" integer,
  "brochure_id" integer,
  "primary_phone" varchar,
  "primary_email" varchar,
  "address" varchar,
  "whatsapp" varchar,
  "business_hours" varchar,
  "default_s_e_o_title" varchar,
  "default_s_e_o_description" varchar,
  "default_s_e_o_image_id" integer,
  "updated_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone,
  FOREIGN KEY ("logo_id") REFERENCES "media"("id"),
  FOREIGN KEY ("favicon_id") REFERENCES "media"("id"),
  FOREIGN KEY ("brochure_id") REFERENCES "media"("id"),
  FOREIGN KEY ("default_s_e_o_image_id") REFERENCES "media"("id")
);

CREATE TABLE IF NOT EXISTS "users_sessions" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar NOT NULL PRIMARY KEY,
  "created_at" timestamp(3) with time zone,
  "expires_at" timestamp(3) with time zone NOT NULL,
  FOREIGN KEY ("_parent_id") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "projects_highlights" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar NOT NULL PRIMARY KEY,
  "point" varchar,
  FOREIGN KEY ("_parent_id") REFERENCES "projects"("id")
);

CREATE TABLE IF NOT EXISTS "projects_amenities" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar NOT NULL PRIMARY KEY,
  "category" varchar,
  "items" varchar,
  FOREIGN KEY ("_parent_id") REFERENCES "projects"("id")
);

CREATE TABLE IF NOT EXISTS "projects_specifications" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar NOT NULL PRIMARY KEY,
  "title" varchar,
  "description" varchar,
  "image_id" integer,
  FOREIGN KEY ("image_id") REFERENCES "media"("id"),
  FOREIGN KEY ("_parent_id") REFERENCES "projects"("id")
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" serial NOT NULL PRIMARY KEY,
  "title" varchar,
  "status" enum_projects_status DEFAULT 'ongoing',
  "slug" varchar,
  "published_at" timestamp(3) with time zone,
  "location" varchar,
  "price_range" varchar,
  "area" varchar,
  "rera_number" varchar,
  "completion_date" timestamp(3) with time zone,
  "description" varchar,
  "cover_image_id" integer,
  "specification_image_id" integer,
  "youtube_url" varchar,
  "construction_progress" numeric DEFAULT 0,
  "construction_image_id" integer,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  FOREIGN KEY ("cover_image_id") REFERENCES "media"("id"),
  FOREIGN KEY ("specification_image_id") REFERENCES "media"("id"),
  FOREIGN KEY ("construction_image_id") REFERENCES "media"("id")
);

CREATE TABLE IF NOT EXISTS "projects_rels" (
  "id" serial NOT NULL PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "media_id" integer,
  FOREIGN KEY ("parent_id") REFERENCES "projects"("id"),
  FOREIGN KEY ("media_id") REFERENCES "media"("id")
);

CREATE TABLE IF NOT EXISTS "payload_kv" (
  "id" serial NOT NULL PRIMARY KEY,
  "key" varchar NOT NULL,
  "data" jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  "id" serial NOT NULL PRIMARY KEY,
  "global_slug" varchar,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object]
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  "id" serial NOT NULL PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "users_id" integer,
  "media_id" integer,
  "enquiries_id" integer,
  "projects_id" integer,
  FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id"),
  FOREIGN KEY ("users_id") REFERENCES "users"("id"),
  FOREIGN KEY ("media_id") REFERENCES "media"("id"),
  FOREIGN KEY ("enquiries_id") REFERENCES "enquiries"("id"),
  FOREIGN KEY ("projects_id") REFERENCES "projects"("id")
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
  "id" serial NOT NULL PRIMARY KEY,
  "key" varchar,
  "value" jsonb,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object]
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  "id" serial NOT NULL PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "users_id" integer,
  FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id"),
  FOREIGN KEY ("users_id") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
  "id" serial NOT NULL PRIMARY KEY,
  "name" varchar,
  "batch" numeric,
  "updated_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object],
  "created_at" timestamp(3) with time zone NOT NULL DEFAULT [object Object]
);

CREATE TABLE IF NOT EXISTS "site_settings_social_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar NOT NULL PRIMARY KEY,
  "platform" enum_site_settings_social_links_platform NOT NULL,
  "url" varchar NOT NULL,
  FOREIGN KEY ("_parent_id") REFERENCES "site_settings"("id")
);