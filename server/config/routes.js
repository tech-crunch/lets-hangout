var helpers = require('./helpers.js'); // our custom middleware
var subCategoryController = require('../subCategories/subCategoryController.js');
var DashboardController = require('../Dashboard/DashboardController.js');

module.exports = function (app, express) {

	// routes for the subCategories
	app.post('/api/subCategory', subCategoryController.createNew);
	app.get('/api/subCategory/:id', subCategoryController.getInfo);

	// routes for the dashboard
	app.post('/api/dashboard', DashboardController.createNew)
	app.put('/api/dashboard/eleminateOptions/:id', DashboardController.eleminateOptions)
	app.get('/api/dashboard/chosenID/:id', DashboardController.getchosenOption)
	app.put('/api/dashboard/voteForOption/:id', DashboardController.voteForOption)
	app.get('/api/dashboard/:id', DashboardController.getInfo)
	
	// If a request is sent somewhere other than the routes above,
	// send it through our custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
