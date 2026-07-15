import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log("[build-migration] No DATABASE_URL found in environment. Skipping db migration.");
  process.exit(0);
}

console.log("[build-migration] Connecting to production database...");

let connectionString = databaseUrl;
if (connectionString.includes(".neon.tech") && !connectionString.includes("-pooler")) {
  connectionString = connectionString.replace(".neon.tech", "-pooler.neon.tech");
}

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  let client;
  try {
    client = await pool.connect();
    console.log("[build-migration] Connected successfully!");

    // 1. Get existing columns of projects table
    const tableDesc = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'projects';
    `);
    
    const hasSpecImgCol = tableDesc.rows.some(r => r.column_name === 'specification_image_id');

    if (!hasSpecImgCol) {
      console.log("[build-migration] Adding column 'specification_image_id' to projects table...");
      const coverImageCol = tableDesc.rows.find(r => r.column_name === 'cover_image_id');
      const dataType = coverImageCol ? coverImageCol.data_type : 'integer';
      
      await client.query(`
        ALTER TABLE projects 
        ADD COLUMN specification_image_id ${dataType} DEFAULT NULL;
      `);
      console.log("[build-migration] Column 'specification_image_id' added successfully!");
    } else {
      console.log("[build-migration] Column 'specification_image_id' already exists.");
    }

    // 2. Check if projects_amenities exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'projects_amenities'
      );
    `);

    if (!tableExists.rows[0].exists) {
      console.log("[build-migration] Creating table 'projects_amenities'...");
      const idCol = tableDesc.rows.find(r => r.column_name === 'id');
      const parentIdType = idCol ? idCol.data_type : 'integer';

      await client.query(`
        CREATE TABLE projects_amenities (
          id serial PRIMARY KEY,
          _parent_id ${parentIdType} NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
          _order integer NOT NULL,
          category varchar(255) DEFAULT NULL,
          items text DEFAULT NULL
        );
      `);
      console.log("[build-migration] Table 'projects_amenities' created successfully!");

      console.log("[build-migration] Creating indexes...");
      await client.query(`
        CREATE INDEX projects_amenities_parent_id_idx ON projects_amenities(_parent_id);
        CREATE INDEX projects_amenities_order_idx ON projects_amenities(_order);
      `);
      console.log("[build-migration] Indexes created successfully!");
    } else {
      console.log("[build-migration] Table 'projects_amenities' already exists.");
    }

    console.log("[build-migration] Database schema is fully synced with Payload configuration.");
  } catch (err) {
    console.error("[build-migration] Database alteration failed:", err);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

run();
