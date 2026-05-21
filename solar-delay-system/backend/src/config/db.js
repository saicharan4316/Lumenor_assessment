const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'solar_delay_system',
  password: 'saivarsha123',
  port: 5500,
});

pool.connect()
  .then(() => {
    console.log('PostgreSQL Connected Successfully');
  })
  .catch((err) => {
    console.log('DB CONNECTION ERROR:', err);
  });

module.exports = pool;