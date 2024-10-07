#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg"); //  used to interact with the PostgreSQL database.


// SQL is a string containing SQL command
const SQL = `
CREATE TABLE IF NOT EXISTS message (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text VARCHAR(200),
    username VARCHAR,
    added TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO message (text, username)
VALUES
    ('Hi, there!', 'Amando'),
    ('Hello World!', 'Charles'),
    ('This is a message!', 'Bob')
`;



// creates a table named messages if it does not already exist. The table has 4 columns: id, text, username, added
// - An integer column that acts as the primary key and is automatically generated
// - Text column
// - string username column to store the username, with a maximum length of 255 characters.
// - added column which returns the timestamp and timezone of when the message was added


// Then inserts three rows into the table.


async function main() {         // async function
  console.log('seeding...');    // logs seeding to console to indicate start of seeding process
  const client = new Client({   // A new instance of Client is created.
    connectionString: process.env.DATABASE_URL,  // connectionString specifies the database connection details
  });
  await client.connect();   //  establishes a connection to the PostgreSQL database using the client.
  await client.query(SQL);  //  Executes the SQL commands defined in the SQL string.
  await client.end();       // This closes the connection to the database.
  console.log("done");      // logs done to console to indicate end of seeding process.
}

main();



// using the pg library, connects to a PostgreSQL database and seeds it with a table and some initial data