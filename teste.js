const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4
});


async function testarConexao() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão OK:', res.rows[0]);
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

testarConexao();