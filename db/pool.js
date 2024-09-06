const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT, //  default is 5432
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Enable SSL in production if required
});