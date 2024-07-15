const express = require('express')
let path = require('path');
const app = express();



//  There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). 
//  Then we set the 'view engine' value to specify the template library (in this case "ejs").
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/',(req, res) => {
  res.send('Hello World!')
})


app.listen(3000, () => {
  console.log(`Starting the server`)
})