const express = require('express')

const router = express.Router();


router.get('/', (req, res) => { // This action tells the browser to send a GET request to the '/' path of whatever server is listening at port 3000
  res.send('<h1>Hello World!</h1>');
}) 



router.get('/messages', (req,res) => {
  res.send('This is where you can see any messages!')
})



router.get('/users', (req, res) => {
  res.send('User endpoint')
})


router.get('/users/cool', (req, res) => {
  res.send('User/ cool endpoint')
})


module.exports = router;

/*
- When our server receives our GET request, Express stores the request in a request object. 

- This (GET) request gets passed through a chain of functions we call middleware functions until eventually, 
   a middleware function tells Express to respond to the request.

- In our example, the request comes through as a GET request to the / path. This matches the route we have in our server.js file.

- To summarize the above line, it tells Express: “if a GET request comes through to the / path, pass the request through the following 
  chain of middleware functions”

- Express takes the callback function we gave it and passes the request object into the first parameter (conventionally named req), 
 and a response object into the second parameter (res). Our callback tells the response object to respond to the request 
  by .sending the string "Hello, world!".


- There is no more code to run and the function returns. Since Express has been told to respond to the request, 
   it ends the request-response cycle. Meanwhile, the browser receives our server’s response and displays it on screen, 
   which is our "Hello, world!" string. 
*/


