var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var mongoose = require('mongoose');
var User = require('../../users/userModel.js');

var should = chai.should();

chai.use(chaiHttp);

describe('User Controller', function () {

	beforeEach(function (done) {
		mongoose.connection.db.dropDatabase(done);
	});
});
