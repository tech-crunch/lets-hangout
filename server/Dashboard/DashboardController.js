var Dashboard = require('./DashboardModel.js');

var pubnub = require('pubnub')({
	ssl: true,  // <- enable TLS Tunneling over TCP
	'publish_key': 'pub-c-b8bfc89b-2bc4-4e14-8e44-60fe8ef001a8',
	'subscribe_key': 'sub-c-17da15be-647f-11e6-8de8-02ee2ddab7fe'
});

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createNew: function (req, res, next) {
		var date = req.body.date || new Date();
		var groupId = req.body.groupId;
		var newDashboard = new Dashboard({
			date: date,
			groupId: groupId
		});
		newDashboard.save(function(err, newDashboard) {
			console.log(err);
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
			{$pull: {options: {$in: req.body.subCategoryIds}}},
			{new: true},
			function(err, dashboard) {
				repsonseHandler(err, req, res, {status: 200, returnObj: dashboard}, next);
			});
	},

	addOption: function (req, res, next) {
		var userId = req.body.userId.toString(); 
		var subCategoryId = req.body.subCategoryId.toString();
		Dashboard.findOne({_id: req.params.id})
		.exec(function(err, dashboard) {
			if (dashboard.voters.indexOf(userId) === -1) {
				dashboard.voters.push(userId);
				dashboard.options.push(subCategoryId);
			}
			dashboard.save( function(err, savedDashboard) {
				triggerClientListener(savedDashboard._id);
				repsonseHandler(err, req, res, {status: 201, returnObj: savedDashboard}, next);
			});
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
				triggerClientListener(savedDashboard._id);
				repsonseHandler(err, req, res, {status: 200, returnObj: savedDashboard}, next);
			});
		});
	}
};


var triggerClientListener = function (id) {
	pubnub.publish({
		channel: 'addOptionLetsHangOut' + id,
		message: 'refresh',
		callback: function(e) { 
			console.log( 'SUCCESS!', e );
		},
		error: function(e) { 
			console.log( 'FAILED! RETRY PUBLISH!', e );
		}
	});
};