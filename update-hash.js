const crypto = require("crypto");
const { Pool } = require("pg");

function generateHashAndSalt(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

const pool = new Pool({
  connectionString: "postgresql://postgres.tgcpgdjvrydeadoiqilz:DakshamDevelopers@aws-1-ap-south-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const password = "daksham@2027";
  const { hash, salt } = generateHashAndSalt(password);
  
  console.log("Generated hash length:", hash.length, "salt length:", salt.length);

  try {
    const res = await pool.query(
      `UPDATE "users" 
       SET hash = $1, salt = $2, updated_at = NOW() 
       WHERE email = $3 
       RETURNING id, email`,
      [hash, salt, "dakshambuilders@gmail.com"]
    );
    console.log("Updated user:", res.rows);
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    await pool.end();
  }
}

run();
