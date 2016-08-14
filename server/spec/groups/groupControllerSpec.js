var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var Group = require('../../groups/groupModel.js');
var User = require('../../users/userModel.js');
var mongoose = require('mongoose');

var should = chai.should();
chai.use(chaiHttp);

describe('Group Controller', function () {
	beforeEach(function (done) {
		mongoose.connection.db.dropDatabase(done);
	});


	

	it('should create new group in database responds with a 201 (Created)', function (done) {
		var newUser = new User({userId: 'usertest', name: 'test', picture: 'test'});
		newUser.save(function (err, user) {
			chai.request(app)
			.post('/api/groups')
			.send({groupName: 'testGroup', _id: user._id})
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
		});
	});

	it('should responed with 500 error when trying to create Empty Group ', function (done) {
		var newUser = new User({userId: 'usertest', name: 'test', picture: 'test'});
		newUser.save(function (err, user) {
			chai.request(app)
			.post('/api/groups')
			.send({})
			.end(function(err, res) {
				res.should.have.status(500);
				done();
			});
		});
	});
	
	it('should add new friend to Group on /api/groups/addFriend/:id POST', function (done) {
		var newGroup = new Group({groupName: 'group1'});
		newGroup.save(function (err, group) {
			var newUser = new User({userId: 'usertest', name: 'test', picture: 'test'});
			newUser.save(function (err, user) {
				chai.request(app)
				.post('/api/groups/addFriend/' + group._id)
				.send({_id: user._id})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					done();
				});
			});
		});
	});

	it('should remove friend from Group on /api/groups/removeFriend/:id PUT', function (done) {
		var newGroup = new Group({groupName: 'group1'});
		newGroup.save(function (err, group) {
			var newUser = new User({userId: 'usertest', name: 'test', picture: 'test'});
			newUser.save(function (err, user) {
				chai.request(app)
				.put('/api/groups/removeFriend/' + group._id)
				.send({_id: user._id})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					done();
				});
			});
		});
	});

	it('should remove Group from database on /api/groups/:id DELETE', function (done) {
		var newGroup = new Group({groupName: 'group1'});
		newGroup.save(function (err, group) {
			chai.request(app)
			.delete('/api/groups/' + group._id)
			.send()
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
		});
	});

	it('should return Group information from database on /api/groups/:id GET', function (done) {
		var newGroup = new Group({groupName: 'test'});
		newGroup.save(function (err, group) {
			chai.request(app)
			.get('/api/groups/' + group._id)
			.send()
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
		}); 
	});

	it('should return Groups information from database on /api/groups GET', function (done) {
		var newGroup = new Group({groupName: 'test'});
		newGroup.save(function (err, group) {
			chai.request(app)
			.get('/api/groups')
			.send()
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body[0].should.be.a('object');
				done();
			});
		});
	});



});
	


