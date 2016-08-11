var User = require('../users/userModel.js');

var repsonseHandler = function(error, req, res, body, next) {
	if (error) {
		next(error, req, res);
	} else {
		res.status(body.status).send(body.returnObj);
	}
};

module.exports = {
	getAll: function (req, res, next) {
		User.find({})
		.exec(function (err, groups) {
			repsonseHandler(err, req, res, {status: 201, returnObj: groups}, next);
		});
	}
};