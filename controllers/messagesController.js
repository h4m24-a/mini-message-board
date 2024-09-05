const db = require('../db/queries');
const { body, validationResult } = require('express-validator');



// Validation and Sanitization
const textErr = 'Text must be no more than 200 characters long'

const validateMessage = [
  body('messageText')
    .trim()
    .isLength({ max: 200 })  // Limit the length to 200 characters
    .withMessage('Message must be no more than 200 characters')
    .notEmpty()
    .withMessage(textErr)
    .isString()
];



// function to retrieve all messages.
const getMessages = async (req, res, next) => {
  try {
    const messages = await db.getAllMessages();   // displays all messages using the db getallmessages query, which includes a sql query to select all columns.
    res.render('index', {     // res.render defaults status code to 200
      title: "Mini Message Board", 
      messagesA: messages     // messagesA is a key in the object, allows us to use this variable in index.ejs to display each message.
    });
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};




// function to render form
const createMessageGet = async (req, res, next) => {
  try {
    res.render('form');     // renders form.ejs when the GET route for /new is hit
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};




// function to create a new message
const createMessagePost = async (req, res, next) => {  

   // Manually running validation middleware
  await Promise.all(validateMessage.map(validation => validation.run(req))); 

  // Checking for validation errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    // If there are errors, return a 400s status with the errors
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const messageUser = req.body.messageUser;  // getting the value of messageUser and storing in the messageUser variable
    const messageText = req.body.messageText;  // getting the value of messageText and storing in the messageText variable
    await db.insertMessage(messageUser, messageText);   // invoking the insert message function and passing in user and text as argugments. insert has two parameters, one for username and one for text.
    res.redirect(302, '/');    // redirects back to homepage

  } catch (error) {   // handle any errors if there is an error.
    next(error);  // Pass the error to the error-handling middleware
  }
};




// function to delete a message
const deleteMessagePost = async (req, res, next) => {
  try {
    const messageId = req.params.id;      // extracting id from url using params
    const id = parseInt(messageId, 10);   // converts id of string to integer.
    await db.deleteMessage(id);           // invoking the delete message function and passing the id as the argument. Uses await keyword to wait until the function completes before proceeding.
    res.redirect(302, '/');               // redirecting the user back to home page.
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};




// function to render the update message form for the selected message using its id.
const updateMessageGet = async (req, res, next) => {
  try {
    const messageId = req.params.id;      // extracting id from url using params
    const id = parseInt(messageId, 10);            // string to integer
    const message = await db.selectMessage(id);  // calls selectMessage db query

    res.render('update', {    // renders update form
      message: message        // passing the message as a variable to have access to it in the update form
    });
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};




// function to update a message
const updateMessagePost = async (req, res, next) => {
  try {
    const messageId = req.params.id;      // extracting id from url using params
    const id = parseInt(messageId, 10);            // string to integer
    const { messageUser, messageText } = req.body;    // get username and text from the body of request

    await db.updateMessage(id, messageUser, messageText);    // call updateMessage to update the message with the text in the username and text using their id
    res.redirect(302, '/');
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



module.exports = {
  getMessages,
  createMessageGet,
  createMessagePost,
  deleteMessagePost,
  updateMessagePost,
  updateMessageGet
}










/*
messageUser is the name attribute of the input form for username
messageUser is the name attribute of the input form for text.

Using their name attribute from form allows us to retrieve the value when the post request is made.

*/