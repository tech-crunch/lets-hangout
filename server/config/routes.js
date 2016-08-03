var helpers = require('./helpers.js'); // our custom middleware
var subCategoryController = require('../subCategories/subCategoryController.js');
var DashboardController = require('../Dashboard/DashboardController.js');
module.exports = function(app,express){
	// routes for the subCategories
	app.post('/api/subCategory', subCategoryController.createNew);
	app.post('/api/dashboard', DashboardController.createNew)
	// If a request is sent somewhere other than the routes above,
	// send it through our custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
