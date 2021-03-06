var Group = require('./groupModel.js');
var User = require('../users/userModel.js');

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createNewGroup: function (req, res, next) {
		var groupName = req.body.groupName;
		var userId = req.body.userId;
		var users = [userId];
		var newGroup = new Group({
			groupName: groupName,
			groupAdmin: userId,
			users: users
		});
		newGroup.save(function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	getInfo: function (req, res, next) {
		var id = req.params.id;
		Group.findOne({_id: id}, function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	addFriendsToGroup: function (req, res, next) {
		var userId = req.body.userId;
		var groupid = req.params.id; 
		Group.findOne({_id: groupid}, function (err, group) {
			group.users.push(userId);
			group.save();
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);	
		});
	},

	removeFriendFromGroup: function(req, res, next) {
		var userId = req.body.userId;
		var groupid = req.params.id; 
		Group.findOneAndUpdate({_id: groupid}, {$pull: {users: userId}}, {new: true}, function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	deleteGroup: function(req, res, next) {
		var groupid = req.params.id; 
		Group.findOneAndRemove({_id: groupid}, function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	getAll: function (req, res, next) {
		Group.find({})
		.exec(function (err, groups) {
			repsonseHandler(err, req, res, {status: 201, returnObj: groups}, next);
		});
	},

	getAllByGroupAdmin: function (req, res, next) {
		var userId = req.params.userId.toString();
		Group.find({users: userId})
		.exec(function (err, groups) {
			repsonseHandler(err, req, res, {status: 200, returnObj: groups}, next);
		});
	},

	addDashboard: function(req, res, next) {
		var groupId = req.params.id.toString(); 
		var dashboardId = req.body.dashboardId.toString();
		Group.findOne({_id: groupId})
		.exec(function(err, group) {
			if (group.dashboards.indexOf(dashboardId) === -1) {
				group.dashboards.push(dashboardId);
			}
			group.save( function(err, savedGroup) {
				repsonseHandler(err, req, res, {status: 201, returnObj: savedGroup}, next);
			});
		});
	}
};