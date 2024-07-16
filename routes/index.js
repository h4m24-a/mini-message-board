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
  }
]

router.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messagesA: messages }) // messagesA (red) is a key in the object
})

router.get('/new', (req,res) => {
  res.render('form',)
})

router.post('/new', (req,res) => {
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  messages.push({text: messageText, user: messageUser, added: new Date()});
  res.redirect('/')
  console.log('POST Request')
})

module.exports = router;




/*
Line 19:
 This is an object containing key-value pairs that are passed to the view template. 
 These pairs become variables that can be used within the view template.


messagesA(red): messages sets a variable messagesA(red) in the view to the value of the messages variable from the current scope (array of objects).


Therefore, messages(red) in this context is an array of objects that is being passed to the view template named 'index'. 
This array can then be used within the view to display the messages on the web page.
*/