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

	it('should get information about all users and responds with a 200', function (done) {
		var users = [
			{
				userId: 'testUserId1',
				name: 'testName1',
				picture: 'testPicture1',
				friends: ['testFriend11','testFriend12']
			},
			{
				userId: 'testUserId2',
				name: 'testName2',
				picture: 'testPicture2',
				friends: ['testFriend21','testFriend22']
			}
		];
		User.create(users, function(err, users) {
			chai.request(app)
    		.get('/api/users')
    		.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.length.should.equal(users.length);
					res.body[0].userId.should.equal(users[0].userId);
					res.body[1].userId.should.equal(users[1].userId);
					done();
				});
		});
	});
});
