var expect = require('chai').expect;
var mongoose = require('mongoose');
var path = require('path');
var Group = require(path.join(__dirname, '..', '..', './groups/groupModel.js'));

describe('Group Model', function () {

	it('Group should be a Mongoose model', function () {
		expect(new Group()).to.be.instanceOf(mongoose.Model);
	});

	it('should have a schema', function () {
		expect(Group.schema).to.exist;
	});
});
