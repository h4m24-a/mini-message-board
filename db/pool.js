const { Pool } = require('pg');



module.exports = new Pool({
  database_url: process.env.DATABASE_URL
});