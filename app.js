const express = require('express')  //  import express
let path = require('path');
const errorHandler = require('./middleware/error')
const notFound = require('./middleware/notFound');
const PORT = process.env.PGPORT || 3000
require('dotenv').config();

const app = express();  // The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by express module.

// Routers
let indexRouter = require('./routes/index')





// Body parser middleware
app.use(express.json());  // submit raw json
app.use(express.urlencoded({ extended: true }));  // takes in an object - replicates web form and sends form data.



// serve static files
app.use(express.static(path.join(__dirname, 'public')));    // 'public' is our static folder.


//  There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). 
//  Then we set the 'view engine' value to specify the template library (in this case "ejs").
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')




// Adding route-handling code to the request handling chain. This will define particular routes for the different parts of the site
app.use('/', indexRouter);



// Catch all errors - on routes/endpoints that don't exist.
app.use(notFound);


// Error handler - order in which functions declare matter - errorhandler is below  the routes
app.use(errorHandler);



app.listen(PORT, () => {             // This function is used to start the server and make it listen for incoming connections on a specified port.
  console.log(`Server running on PORT ${PORT}`)
}) 



// You can create custom middleware functions by using the app. use() method. 