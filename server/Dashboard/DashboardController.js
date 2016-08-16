var Dashboard = require('./DashboardModel.js');

var repsonseHandler = function(error, req, res, body, next) {
	if (error) {
		next(error, req, res);
	} else {
		res.status(body.status).send(body.returnObj);
	}
};

module.exports = {
	createNew: function (req, res, next) {
		var date = req.body.date;
		var newDashboard = new Dashboard({date: date});
		newDashboard.save(function(err, newDashboard) {
			repsonseHandler(err, req, res, {status: 201, returnObj: newDashboard}, next);
		});
	},

	getInfo: function (req, res, next) {
		Dashboard.findOne({_id: req.params.id})
		.exec(function(err, dashboard) {
			repsonseHandler(err, req, res, {status: 200, returnObj: dashboard}, next);
		});
	},

	eleminateOptions: function (req, res, next) {
		Dashboard.findOneAndUpdate(
			{_id: req.params.id},
			{$pull: {options: {subCategoryId: {$in: req.body.subCategoryIds}}}},
			{new: true},
			function(err, dashboard) {
				repsonseHandler(err, req, res, {status: 200, returnObj: dashboard}, next);
			});
	},

	addOption: function (req, res, next) {
		Dashboard.findOneAndUpdate(
			{_id: req.params.id},
			{ $push: { options: {subCategoryId: req.body.subCategoryId} } },
			{new: true},
			function(err, dashboard) {
				repsonseHandler(err, req, res, {status: 200, returnObj: dashboard}, next);
			});
	},

	voteForOption: function (req, res, next) {
		var userId = req.body.userId;
		var subC = req.body.subCategoryId;
		Dashboard.findOne({_id: req.params.id})
		.exec(function(err, dashboard) {
			var votingObj = JSON.parse(dashboard.voting);
			votingObj[userId] = subC;
			dashboard.voting = JSON.stringify(votingObj);
			dashboard.save(function(err, savedDashboard) {
				repsonseHandler(err, req, res, {status: 200, returnObj: savedDashboard}, next);
			});
		});
	}
};