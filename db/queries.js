const e = require('express');
const pool = require('./pool');

async function getAllMessages() {
  try {
    const { rows } =  await pool.query("SELECT * FROM message") // result of the pool.query() call is being destructured meaning that that the pool.query() method returns an object.
    return rows; // this object has a property called rows. By using destructuring, we directly extract the rows property into the rows variable.
    
  } catch (error) {
    console.log('Error retrieving messages:', error);
    throw error // Re-throwing the error to let the caller handle it if necessary
  }
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
  try {
    await pool.query("INSERT INTO message (username, text)  VALUES ($1, $2)", [username, text] );
    
  } catch (error) {
    console.log('Error inserting message:', error)
    throw error; // Re-throwing the error to let the caller handle it if necessary
  }
}



async function deleteMessage(id) {
  try {
    await pool.query("DELETE FROM message WHERE id = $1", [id] );           // deletes a record using the id of the selected message.
    
  } catch (error) {
    console.log('Error deleting message:', error);
    throw error;
  }                            
}
  


async function updateMessage(id, username, text) {
  try {
    await pool.query("UPDATE message SET username = $1, text = $2 WHERE id = $3",[username, text, id]);
    
  } catch (error) {
    console.log('Error updating message:', error);
    throw error;
  }
}


async function selectMessage(id) {
  try {
    const result = await pool.query("SELECT * FROM message WHERE id = $1", [id]);
    return result.rows[0];
    
  } catch (error) {
    console.log('Error retrieving a single message', error)
    throw error;
  }
}


module.exports = {  // This line exports the functions, making them available for use in other parts of the application.
  getAllMessages,
  insertMessage,
  deleteMessage,
  updateMessage,
  selectMessage
}


/*
 Try-Catch Block: Each function wraps the database operation inside a try-catch block. 
 If an error occurs during the database query, the catch block handles it.


 Errors are logged using console.error(), which helps in debugging and monitoring.

 After logging, the error is re-thrown using throw error;. This allows the calling code to handle the error as well, 
 which might include rolling back transactions, notifying users, or other application-specific error handling.
*/