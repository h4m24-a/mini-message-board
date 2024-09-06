const { Pool } = require('pg');



module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  internal_url: process.env.INTERNAL_URL, 
  ssl: {
    rejectUnauthorized: false,
  }
});