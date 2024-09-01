const db = require('../db/queries');

async function getMessages(req, res) {
  const messages =  await db.getAllMessages();  // displays all messages using the db query
  res.render('index', { 
    title: "Mini Message Board", 
    messagesA: messages // messagesA  is a key in the object, allows us to use this variable in index.ejs to display each message.
  }); 
}


async function createMessageGet(req, res) {
  res.render('form',)   // renders  form.ejs
}


async function createMessagePost(req, res) {   
  const messageUser = req.body.messageUser;  // user: This property is set to the value of the variable messageUser, which contains the identifier of the user who sent the message.
  const messageText = req.body.messageText; // text: This property is set to the value of the variable messageText, which contains the content of the message.
  await db.insertMessage(messageUser, messageText)
  res.redirect('/')   // redirect back to home page.
  console.log('POST Request')
}


module.exports = {
  getMessages,
  createMessageGet,
  createMessagePost
}


/*
messageUser is the name attribute of the input form for username
messageUser is the name attribute of the input form for text.

Using their attribute allows us to retrieve the value when the post request is made.

*/