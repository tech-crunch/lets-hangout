var mongoose = require('mongoose');
var app = require('./config/routes.js');

// connect to mongo database named "lets-hangout"
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/lets-hangout';
mongoose.connect(mongoURI);
db = mongoose.connection;

// start listening to requests on port 8000
var port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log(' app listening on port ' + port);
});

// export our app for testing and flexibility, required by index.js
module.exports = app;
