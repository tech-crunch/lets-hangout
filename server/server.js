var express = require('express');
var mongoose = require('mongoose');

// connect to mongo database named "lets-hangout"
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/lets-hangout';
mongoose.connect(mongoURI);
db = mongoose.connection;

var app = express();

// configure our server with all the middleware and routing
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

require('./config/middleware.js')(app, express);
require('./config/routes')(app,express);


// start listening to requests on port 8000
var port = process.env.PORT || 8000;

app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
