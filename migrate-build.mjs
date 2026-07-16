import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL not found in process.env");
  process.exit(1);
}

console.log("Connecting to database...");

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log("Connected successfully!");

    // Describe projects table
    const tableDesc = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'projects';
    `);

    const hasProgressCol = tableDesc.rows.some(r => r.column_name === 'construction_progress');
    const hasImageCol = tableDesc.rows.some(r => r.column_name === 'construction_image_id');

    if (!hasProgressCol) {
      console.log("Adding column 'construction_progress' to projects table...");
      await pool.query(`
        ALTER TABLE projects
        ADD COLUMN construction_progress numeric DEFAULT 0;
      `);
      console.log("Column 'construction_progress' added successfully!");
    } else {
      console.log("Column 'construction_progress' already exists.");
    }

    if (!hasImageCol) {
      console.log("Adding column 'construction_image_id' to projects table...");
      const coverImageCol = tableDesc.rows.find(r => r.column_name === 'cover_image_id');
      const dataType = coverImageCol ? coverImageCol.data_type : 'numeric';
      console.log(`Using data type for construction_image_id: ${dataType}`);
      await pool.query(`
        ALTER TABLE projects
        ADD COLUMN construction_image_id ${dataType} DEFAULT NULL;
      `);
      console.log("Column 'construction_image_id' added successfully!");
    } else {
      console.log("Column 'construction_image_id' already exists.");
    }

    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
