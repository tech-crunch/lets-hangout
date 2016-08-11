var expect = require('chai').expect;
var mongoose = require('mongoose');
var path = require('path');
var User = require(path.join(__dirname, '..', '../users/userModel.js'));

describe('User Model', function () {

	it('should be a Mongoose model', function () {
		expect(new User()).to.be.instanceOf(mongoose.Model);
	});

	it('should have a schema', function () {
		expect(User.schema).to.exist;
	});
});