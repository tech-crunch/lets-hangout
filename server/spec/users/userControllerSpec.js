var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var mongoose = require('mongoose');
var User = require('../../users/userModel.js');

var should = chai.should();

chai.use(chaiHttp);

var postUser = function(body, expectations) {
	chai.request(app)
    .post('/api/users')
    .send(body)
    .end(expectations);
};

describe('User Controller', function () {

	beforeEach(function (done) {
		mongoose.connection.db.dropDatabase(done);
	});

	it('should create new user in database and responds with a 201 (Created)', function (done) {
		var testObj = {
			userId: 'userId',
			name: 'name',
			picture: 'picture',
			friends: ['friends']
		};
		postUser(testObj,
			function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('userId');
				res.body.should.have.property('picture');
				res.body.should.have.property('name');
				res.body.should.have.property('friends');
				res.body.picture.should.equal(testObj.picture);
				res.body.name.should.equal(testObj.name);
				res.body.userId.should.equal(testObj.userId);
				done();
			});
	});

	it('should respond with 500 error when trying to create empty user', function (done) {
		postUser({},
			function(err, res) {
				res.should.have.status(500);
				done();
			});
	});

	it('should get information about all users and responds with a 200', function (done) {
		var users = [
			{
				userId: 'testUserId1',
				name: 'testName1',
				picture: 'testPicture1',
				friends: ['testFriend11', 'testFriend12']
			},
			{
				userId: 'testUserId2',
				name: 'testName2',
				picture: 'testPicture2',
				friends: ['testFriend21', 'testFriend22']
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

	it('should get information of a user by userId and responds with a 200', function (done) {  
		var newUser = new User({
			userId: 'userId',
			name: 'name',
			picture: 'picture'
		});
		newUser.save(function(err, data) {
			chai.request(app)
			.get('/api/users/' + data.userId)
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('picture');
				res.body.should.have.property('name');
				res.body.should.have.property('userId');
				res.body.picture.should.equal(data.picture);
				res.body.name.should.equal(data.name);
				res.body.userId.should.equal(data.userId);
				done();
			});
		});
	});

	it('should respon with 500 error when trying to get non-existence user', function (done) {  
		chai.request(app)
		.get('/api/users/' + '123')
		.end(function(err, res) {
			res.should.have.status(500);
			res.should.be.json;
			done();
		});
	});

	it('should edit information of a user by userId and responds with a 200', function (done) {  
		var newUser = new User({
			userId: 'userId',
			name: 'name',
			picture: 'picture'
		});
		newUser.save(function(err, data) {
			chai.request(app)
			.put('/api/users/' + data.userId)
			.send()
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('picture');
				res.body.should.have.property('name');
				res.body.should.have.property('userId');
				res.body.picture.should.equal(data.picture);
				res.body.name.should.equal('name');
				res.body.userId.should.equal(data.userId);
				chai.request(app)
				.put('/api/users/' + data.userId)
				.send({
					name: 'newName',
					picture: 'newPicture',
					friends: []
				})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('picture');
					res.body.should.have.property('name');
					res.body.should.have.property('userId');
					res.body.picture.should.equal('newPicture');
					res.body.name.should.equal('newName');
					res.body.userId.should.equal(data.userId);
					done();
				});
			});
		});
	});

	it('should get friends list of a user by userId and responds with a 200', function (done) {  
		var usersArr = [
			{
				userId: 'testUserId1',
				name: 'testName1',
				picture: 'testPicture1',
				friends: ['testFriend1', 'testFriend2']
			},
			{
				userId: 'testFriend1',
				name: 'testName2',
				picture: 'testPicture2'
			},
			{
				userId: 'testFriend2',
				name: 'testName3',
				picture: 'testPicture3'
			}
		];
		User.create(usersArr, function(err, users) {
			chai.request(app)
				.get('/api/users/friends/' + usersArr[0].userId)
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.length.should.equal(2);
					res.body[0].userId.should.equal(usersArr[1].userId);
					res.body[1].userId.should.equal(usersArr[2].userId);
					done();
				});
		});
	});
});
