const pool = require('./pool');

async function getAllMessages() {
  const { rows } =  await pool.query("SELECT * FROM message") // result of the pool.query() call is being destructured meaning that that the pool.query() method returns an object.
  return rows; // this object has a property called rows. By using destructuring, we directly extract the rows property into the rows variable.
}

/*
This async function fetches all columns from the messages table.
 It uses the pool.query() method to send a SQL query to the database.
 await is used to wait for the query to complete.
 The result of the query is destructured to get the rows property, which contains the actual data returned by the query.
 The function returns the rows object, which is an array of all rows (each representing a record) from the usernames table.


 return rows does two things:
 1. It will end the function execution immediately.
 2. It will return the value of rows to wherever getAllUsernames() was called.
 No code after the return statement will be executed because the function has ended its execution.
*/


async function insertMessage(username, text ) {
  await pool.query("INSERT INTO message (username, text)  VALUES ($1, $2)", [username, text] );
}



async function deleteMessage(id) {
 await pool.query("DELETE FROM message WHERE id = $1", [id] );
}

module.exports = {  // This line exports the functions, making them available for use in other parts of the application.
  getAllMessages,
  insertMessage,
  deleteMessage
}

