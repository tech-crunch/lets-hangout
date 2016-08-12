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
	}
};