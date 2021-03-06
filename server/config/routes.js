var helpers = require('./helpers.js'); // our custom middleware
var categoryController = require ('../categories/categoryController.js');
var subCategoryController = require('../subCategories/subCategoryController.js');
var DashboardController = require('../Dashboard/DashboardController.js');
var categoryController = require ('../categories/categoryController.js');
var groupController = require('../groups/groupController.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {

	// route for getting the AUTH0 Client_ID and Domain
	app.get('/api/authCredentials', function(req, res, next) {
		var AUTH0_CLIENT_ID = process.env.AuthClientID;
		var AUTH0_DOMAIN = process.env.AuthDomain;
		if (AUTH0_DOMAIN && AUTH0_CLIENT_ID) {
			res.status(200).send({
				AUTH0_CLIENT_ID: AUTH0_CLIENT_ID,
				AUTH0_DOMAIN: AUTH0_DOMAIN
			});
		} else {
			next('Credentials Were Not Provided', req, res);
		}
	}, helpers.errorHandler);

	// routes for users
	app.get('/api/users', userController.getAll, helpers.errorHandler);
	app.post('/api/users', userController.createNew, helpers.errorHandler);
	app.get('/api/users/friends/:userId', userController.getFriends, helpers.errorHandler);
	app.get('/api/users/:userId', userController.getOne, helpers.errorHandler);
	app.put('/api/users/:userId', userController.updateInfo, helpers.errorHandler);

	// routes for the subCategories
	app.post('/api/subCategory', subCategoryController.createNew, helpers.errorHandler);
	app.get('/api/subCategory/getChildren/:id', subCategoryController.getChildren, helpers.errorHandler);
	app.get('/api/subCategory/:id', subCategoryController.getInfo, helpers.errorHandler);
	app.post('/api/subCategories', subCategoryController.getSubCategories, helpers.errorHandler);
	
	// routes for categories 
	app.get('/api/categories', categoryController.getAll, helpers.errorHandler);
	app.get('/api/categories/:id', categoryController.getOne, helpers.errorHandler);
	app.post('/api/categories', categoryController.addCategory, helpers.errorHandler);

	// routes for the dashboard
	app.post('/api/dashboard', DashboardController.createNew, helpers.errorHandler);
	app.put('/api/dashboard/eleminateOptions/:id', DashboardController.eleminateOptions, helpers.errorHandler);
	app.put('/api/dashboard/voteForOption/:id', DashboardController.voteForOption, helpers.errorHandler);
	app.put('/api/dashboard/addOption/:id', DashboardController.addOption, helpers.errorHandler);
	app.get('/api/dashboard/:id', DashboardController.getInfo, helpers.errorHandler);
	
	// routes for the groups
	app.get('/api/groups', groupController.getAll, helpers.errorHandler);
	app.post('/api/groups', groupController.createNewGroup, helpers.errorHandler);
	app.put('/api/groups/addDashboard/:id', groupController.addDashboard, helpers.errorHandler);
	app.put('/api/groups/addFriend/:id', groupController.addFriendsToGroup, helpers.errorHandler);
	app.put('/api/groups/removeFriend/:id', groupController.removeFriendFromGroup, helpers.errorHandler);
	app.delete('/api/groups/:id', groupController.deleteGroup, helpers.errorHandler);
	app.get('/api/groups/:id', groupController.getInfo, helpers.errorHandler);
	app.get('/api/groups/groupsByAdmin/:userId', groupController.getAllByGroupAdmin, helpers.errorHandler);		

	// If a request is sent somewhere other than the routes above,
	// send it through our custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
