var helpers = require('./helpers.js'); // our custom middleware
var categoryController = require ('../categories/categoryController.js');
var subCategoryController = require('../subCategories/subCategoryController.js');
var DashboardController = require('../Dashboard/DashboardController.js');

module.exports = function (app, express) {
	
	//categories controller 
  	app.get('/api/categories', categoryController.getAll);

	// routes for the subCategories
	app.post('/api/subCategory', subCategoryController.createNew, helpers.errorHandler);
	app.get('/api/subCategory/getChildren/:id', subCategoryController.getChildren, helpers.errorHandler);
	app.get('/api/subCategory/:id', subCategoryController.getInfo, helpers.errorHandler);
	app.put('/api/subCategory/:id', subCategoryController.addChild, helpers.errorHandler);

	// routes for the dashboard
	app.post('/api/dashboard', DashboardController.createNew, helpers.errorHandler)
	app.put('/api/dashboard/eleminateOptions/:id', DashboardController.eleminateOptions, helpers.errorHandler)
	app.get('/api/dashboard/chosenID/:id', DashboardController.getchosenOption, helpers.errorHandler)
	app.put('/api/dashboard/voteForOption/:id', DashboardController.voteForOption, helpers.errorHandler)
	app.get('/api/dashboard/:id', DashboardController.getInfo, helpers.errorHandler)
	app.put('/api/dashboard/addOption/:id', DashboardController.addOption, helpers.errorHandler)
	
	// If a request is sent somewhere other than the routes above,
	// send it through our custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
