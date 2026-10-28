const { Client } = require('pg');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Set DATABASE_URL in your environment first (never commit credentials).");
    process.exit(1);
  }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  
  try {
    await client.connect();
    
    // Check if projects table exists and query it
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public';
    `);
    console.log("Tables in DB:", tablesRes.rows.map(r => r.table_name));

    const projectsRes = await client.query('SELECT COUNT(*) FROM projects;');
    console.log("Number of projects in DB:", projectsRes.rows[0].count);

    const mediaRes = await client.query('SELECT COUNT(*) FROM media;');
    console.log("Number of media files in DB:", mediaRes.rows[0].count);

    const projectDocs = await client.query('SELECT id, title, slug, status FROM projects;');
    console.log("Projects:", projectDocs.rows);

  } catch (err) {
    console.error("Database query failed:", err);
  } finally {
    await client.end();
  }
}

main();
