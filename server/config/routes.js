var express = require('express');
var helpers = require('./helpers.js'); // our custom middleware
var subCategoryController = require('../subCategories/subCategoryController.js');

var app = express();

// configure our server with all the middleware and routing
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

require('./middleware.js')(app, express);

// routes for the subCategories
app.post('/api/subCategory', subCategoryController.createNew);

// If a request is sent somewhere other than the routes above,
// send it through our custom error handler
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);

module.exports = app;
