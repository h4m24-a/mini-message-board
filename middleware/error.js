// Error handler middleware
const errorHandler = (err, req, res, next) => {
  if (err.status) {     
    res.status(err.status).json({message: err.message})  // if there is an error, set it to whatever the error status is, and set the message to err.message.  The message is passed in post.js which we can access through the err object.

  } else {    // else if there is no status defined, we set the error to 500
    res.status(500).json({message: err.message}); 
  }
}

// We don't want a default status of 404, we want to check if we set a status in the route, if we didn't, then we want a 500 status by default which means there's a server error

module.exports =  errorHandler;


// Here we handle errors using this code.