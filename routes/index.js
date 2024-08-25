const express = require('express');
const router = express.Router();


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  },
  {
    text: 'This is a message!',
    user: 'Bob',
    added: new Date()
  }
]

router.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messagesA: messages }) // messagesA  is a key in the object
})

router.get('/new', (req,res) => {
  res.render('form',)
})

router.post('/new', (req,res) => {      //  When a POST request is made to /new,     by the form
  const messageUser = req.body.messageUser;  // user: This property is set to the value of the variable messageUser, which contains the identifier of the user who sent the message.
  const messageText = req.body.messageText; // text: This property is set to the value of the variable messageText, which contains the content of the message.
  messages.push({text: messageText, user: messageUser, added: new Date()}); // This is the object that has 3 properties, that is being added to the messages array of objects.
  res.redirect('/')   // redirect back to home page.
  console.log('POST Request')
})

module.exports = router;





/*
Line 24:
 This is an object containing key-value pairs that are passed to the view template. 
 These pairs become variables that can be used within the view template.


messagesA: messages sets a variable messagesA in the view to the value of the messages variable from the current scope (array of objects).


Therefore, messages(red) in this context is an array of objects that is being passed to the view template named 'index'. 
This array can then be used within the view to display the messages on the web page.




The individual fields inside the body object are named according to the name attribute on your inputs (the value of <input name="messageText">)
 will show up as req.body.messageText inside the router.post function.


 Line 31:
 '/new': This is the path or URL endpoint where the POST request is directed. 
   It indicates that the server is set up to handle POST requests sent to /new.
   server is expecting POST requests to be sent to the /new URL, and it will respond accordingly when such requests are made.




router.post request:
 new Date(), which captures the current date and time when the message was added. 
 text, user, and added are the keys of an object that represent the properties of a message.

- The text property of the new message object is set to the value of messageText from the form.
- The user property is set to the value of messageUser
- The added property is set to a new Date object.

*/