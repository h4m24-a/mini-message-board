const { Pool } = require('pg');



module.exports = new Pool({ 
  DATABASE_PUBLIC_URL:process.env.DATABASE_PUBLIC_URL,
  DATABASE_URL:process.env.DATABASE_URL,
  PGDATA:process.env.PGDATA,
  PGDATABASE:process.env.PGDATABASE,
  PGHOST:process.env.PGHOST,
  PGPASSWORD:process.env.PGPASSWORD,
  PGPORT:process.env.PGPORT,
  PGUSER:process.env.PGUSER,
  POSTGRES_DB:process.env.POSTGRES_DB,
  POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD,
  POSTGRES_USER:process.env.POSTGRES_USER,
  SSL_CERT_DAYS:process.env.SSL_CERT_DAYS
});