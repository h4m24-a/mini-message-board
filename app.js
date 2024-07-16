const express = require('express')
let path = require('path');

let indexRouter = require('./routes/index')


const app = express();


// Body parser middleware
app.use(express.json());  // submit raw json
app.use(express.urlencoded({ extended: false }));  // takes in an object - replicates web form and sends form data.

// serve static files
app.use(express.static('public'));


//  There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). 
//  Then we set the 'view engine' value to specify the template library (in this case "ejs").
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Adding route-handling code to the request handling chain. This will define particular routes for the different parts of the site
app.use('/', indexRouter);




app.listen(3000, () => {
  console.log(`Starting the server`)
})
