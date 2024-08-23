const express = require('express'); // importing express module
const router = express.Router()   // create a new router object


router.get('/', (req, res) => {  // This method used to define a route that listens for HTTP GET request
             // This is the path or endpoint for the route. In this case, '/' refers to the root of the path associated with this router. 
  res.send('All Authors'); // This method is used to send a response back to the client. Whatever you pass to res.send() will be sent as the body of the HTTP response
})


/*
(req, res) => { ... }:
This is a callback function, also known as a route handler. 
It is called whenever a GET request is made to the specified path (in this case, '/').


req: "request," this object represents the HTTP request and contains information about the request, such as query parameters, the request body, headers.

res: "response," this object represents the HTTP response that the Express app will send back to the client.
*/


router.get('/:authorId', (req, res) => {
  console.log(req.params); // Just logs object : { authorId: '1234' }            // req.params.authorId gives you the value: 1234
  res.send(`Author ID : ${req.params.authorId}`);  // Author ID : 1234
});


router.get('/authorstesting', (req, res) => {
  res.send('<h1>Author Testing Page!</h1>')
})

module.exports = router;


/*
This route handles GET requests to the root path '/' of this router. 
When a client makes a GET request to this path (e.g., /authors/ if this router is mounted at /authors), 
the server responds with the text 'All Authors'.
*/



/*
Inside authorsRouter.js, which extends the /authors path in app.js:

/ will match requests with the path /authors
/:authorId will match requests with the path /authors/:authorId

*/