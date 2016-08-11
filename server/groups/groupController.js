var Group = require('./groupModel.js');
var User = require('../users/userModel.js');

var repsonseHandler = function(error, req, res, body, next) {
	if (error) {
		next(error, req, res);
	} else {
		res.status(body.status).send(body.returnObj);
	}
};


module.exports = {
	createNewGroup: function (req, res, next) {
		var groupName = req.body.groupName;
		var userid = req.params.id;
		var newGroup = new Group({groupName: groupName, groupAdmin: userid});
		newGroup.save(function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	getInfo: function (req, res, next) {
		var groupName = req.params.groupName;
		Group.findOne({groupName: groupName}, function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	addFriendsToGroup: function (req, res, next) {
		var username = req.body.username;
		var groupName = req.params.groupName; 
		Group.findOne({groupName: groupName}, function (err, group) {
			User.findOne({username: username}, function (err, user) {
				group.users.push(user._id);
				repsonseHandler(err, req, res, {status: 201, returnObj: user}, next);
			});
		});
	},

	removeFriendFromGroup: function(req, res, next) {
		var username = req.body.username;
		var groupName = req.params.groupName; 
		User.findOne({username: username}, function (err, user) {
			Group.findOneAndUpdate({groupName: groupName}, {$pull: {users: user._id}}, {new: true}, function (err, group) {
				repsonseHandler(err, req, res, {status: 201, returnObj: user}, next);
			});
		});
	},

	deleteGroup: function(req, res, next) {
		var groupName = req.params.groupName; 
		Group.findOneAndRemove({groupName: groupName}, function (err, group) {
			repsonseHandler(err, req, res, {status: 201, returnObj: group}, next);
		});
	},

	getAll: function (req, res, next) {
		Group.find({})
		.exec(function (err, groups) {
			repsonseHandler(err, req, res, {status: 201, returnObj: groups}, next);
		});
	}
};
