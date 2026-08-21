import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log("DATABASE_URL not found in process.env. Skipping pre-build database migration.");
  process.exit(0);
}

console.log("Connecting to database for pre-build schema verification...");

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 5000,
});

async function run() {
  try {
    console.log("Connected to database successfully.");

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

    console.log("Pre-build schema verification complete!");
  } catch (err) {
    console.warn("Notice: Pre-build schema verification skipped:", err.message || err);
    process.exit(0);
  } finally {
    try {
      await pool.end();
    } catch {}
  }
}

run();
