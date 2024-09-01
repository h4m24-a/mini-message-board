const db = require('../db/queries');

async function getMessages(req, res) {
  const messages =  await db.getAllMessages();
  res.render('index', { 
    title: "Mini Message Board", 
    messagesA: messages // messagesA  is a key in the object
  }); 
}


async function createMessageGet(req, res) {
  res.render('form',)
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