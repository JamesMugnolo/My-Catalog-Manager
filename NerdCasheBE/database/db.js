const path = require("path");
const { Pool } = require("pg");
const { migrate } = require("postgres-migrations");

const poolConfig = {
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const pool = new Pool(poolConfig);
console.log(poolConfig)
const db = {
  runMigrations: async function () {
    const client = await pool.connect();
    try {
      await migrate({ client }, path.resolve(__dirname, "migrations/sql"));
    } catch (err) {
      console.error("migration failed", err);
    } finally {
      client.release();
    }
  },
};

module.exports = { db, pool };
