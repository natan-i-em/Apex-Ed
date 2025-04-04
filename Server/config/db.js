const { Pool } = require("pg"); // Import Pool from pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
});

// Test the database connection
pool.connect()
  .then(client => {
    console.log("✅ Database connected successfully!");
    client.release(); // Release the client back to the pool
  })
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
  });

module.exports = pool;
