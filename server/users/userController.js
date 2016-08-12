var User = require('../users/userModel.js');

var repsonseHandler = function(error, req, res, body, next) {
	if (error) {
		next(error, req, res);
	} else {
		res.status(body.status).send(body.returnObj);
	}
};

module.exports = {
	createNew: function(req, res, next) {
		var userId = req.body.userId;
		var name = req.body.name;
		var picture = req.body.picture;
		var friends = req.body.friends;

		var newUser = User({
			userId: userId,
			name: name,
			picture: picture,
			friends: friends
		});

		newUser.save(function(err, newUser) {
			repsonseHandler(err, req, res, {status: 201, returnObj: newUser}, next);
		});
	},

	getAll: function(req, res, next) {
		User.find({})
		.exec(function (err, users) {
			repsonseHandler(err, req, res, {status: 200, returnObj: users}, next);
		});
	},

	getOne: function(req, res, next) {
		var userId = req.params.userId.toString();
		User.findOne({userId: userId})
		.exec(function (err, user) {
			repsonseHandler(err, req, res, {status: 200, returnObj: user}, next);
		});
	},

	updateInfo: function(req, res, next) {
		var userId = req.params.userId.toString();
		User.findOne({userId: userId})
		.exec(function (err, user) {
			user.name = req.body.name || user.name;
			user.picture = req.body.picture || user.picture;
			user.friends = req.body.friends || user.friends;
			user.save(function (err, savedUser) {
				repsonseHandler(err, req, res, {status: 201, returnObj: savedUser}, next);
			});
		});
	},

	getFriends: function(req, res, next) {
		var userId = req.params.userId.toString();
		User.findOne({userId: userId})
		.exec(function (err, user) {
			var friendsList = user.friends;
			User.find({userId: { $in: friendsList}})
			.exec(function (err, friends) {
				repsonseHandler(err, req, res, {status: 200, returnObj: friends}, next);
			});
		});
	}
};