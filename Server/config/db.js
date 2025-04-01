const { Pool } = require("pg"); // Import Pool from pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
});

module.exports = pool;
