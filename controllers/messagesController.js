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


const getMessages = async (req, res, next) => {
  try {
    const messages = await db.getAllMessages();   // displays all messages using the db query
    res.render('index', { 
      title: "Mini Message Board", 
      messagesA: messages     // messagesA is a key in the object, allows us to use this variable in index.ejs to display each message.
    });
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



// Controller function to render  form
const createMessageGet = async (req, res, next) => {
  try {
    res.render('form');
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



// Controller function to create a new message
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
    const messageUser = req.body.messageUser;  // user: This property is set to the value of the variable messageUser, which contains the identifier of the user who sent the message.
    const messageText = req.body.messageText;  // text: This property is set to the value of the variable messageText, which contains the content of the message.
    await db.insertMessage(messageUser, messageText);
    res.redirect('/');    // redirects back to homepage
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



// Controller function to delete a message
const deleteMessagePost = async (req, res, next) => {
  try {
    const messageId = req.params.id;      // extracting id from url using params
    const id = parseInt(messageId, 10);   // converts id of string to integer.
    await db.deleteMessage(id);
    res.redirect('/');
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



// Controller function to render the update message form
const updateMessageGet = async (req, res, next) => {
  try {
    const messageId = req.params.id;            // get id from router parameter
    const message = await db.selectMessage(messageId);  // calls selectMessage db query

    res.render('update', {    // renders update form
      message: message        // passing the message as a variable to have access to it in the update form
    });
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};



// Controller function to update a message
const updateMessagePost = async (req, res, next) => {
  try {
    const messageId = req.params.id;      // get id from router
    const { messageUser, messageText } = req.body;    // get username and text from the body of request

    await db.updateMessage(messageId, messageUser, messageText);    // call updateMessage to update the message with the text in the username and text using their id
    res.redirect('/');
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

Using their attribute allows us to retrieve the value when the post request is made.

*/