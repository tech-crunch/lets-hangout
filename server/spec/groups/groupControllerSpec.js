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
		var newUser = new User({
			userId: 'usertest',
			name: 'test',
			picture: 'test'
		});
		newUser.save(function (err, user) {
			chai.request(app)
			.post('/api/groups')
			.send({groupName: 'testGroup', userId: user._id})
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
		});
	});

	it('should responed with 500 error when trying to create Empty Group ', function (done) {
		var newUser = new User({
			userId: 'usertest',
			name: 'test',
			picture: 'test'
		});
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
		var newGroup = new Group({
			groupName: 'group1',
			groupAdmin: '1234'
		});
		newGroup.save(function (err, group) {
			var newUser = new User({userId: 'usertest', name: 'test', picture: 'test'});
			newUser.save(function (err, user) {
				chai.request(app)
				.put('/api/groups/addFriend/' + group._id)
				.send({userId: user._id})
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
		var newGroup = new Group({
			groupName: 'group1',
			groupAdmin: '1234',
			users: ['1234']
		});
		newGroup.save(function (err, group) {
			var newUser = new User({
				userId: 'usertest',
				name: 'test',
				picture: 'test'
			});
			newUser.save(function (err, user) {
				chai.request(app)
				.put('/api/groups/removeFriend/' + group._id)
				.send({userId: '1234'})
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
		var newGroup = new Group({
			groupName: 'group1',
			groupAdmin: '1234'
		});
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
		var newGroup = new Group({
			groupName: 'test',
			groupAdmin: '1234'
		});
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
		var newGroup = new Group({
			groupName: 'test',
			groupAdmin: '1234'
		});
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

	it('should return Groups information depend on userId on /api/groups/groupsByAdmin/:userId GET', function (done) {
		var newGroup = new Group({
			groupName: 'test',
			groupAdmin: 'usertest',
			users: ['usertest']
		});
		newGroup.save(function (err, group) {
			chai.request(app)
			.get('/api/groups/groupsByAdmin/' + group.groupAdmin)
			.send()
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body[0].should.be.a('object');
				done();
			});
		});
	});

	it('should add dashboard id to a group', function (done) {
		var newGroup = new Group({
			groupName: 'test',
			groupAdmin: 'usertest',
			users: ['usertest']
		});
		newGroup.save(function (err, group) {
			chai.request(app)
			.put('/api/groups/addDashboard/' + group._id)
			.send({
				dashboardId: group._id
			})
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				var length = res.body.dashboards.length - 1;
				res.body.dashboards[length].should.equal(group._id.toString());
				done();
			});
		});
	});

	it('should skip adding existing dashboard id to a group', function (done) {
		var newGroup = new Group({
			groupName: 'test',
			groupAdmin: 'usertest',
			users: ['usertest']
		});
		newGroup.save(function (err, group) {
			chai.request(app)
			.put('/api/groups/addDashboard/' + group._id)
			.send({
				dashboardId: group._id
			})
			.end(function(err, res) {
				chai.request(app)
				.put('/api/groups/addDashboard/' + group._id)
				.send({
					dashboardId: group._id
				})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					done();
				});
			});
		});
	});
});
	


