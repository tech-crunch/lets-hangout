var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var Dashboard = require('../../Dashboard/DashboardModel.js');
var mongoose = require('mongoose');
var should = chai.should();
chai.use(chaiHttp);

describe('Dashboard Controller', function () {

	beforeEach(function (done) {
		mongoose.connection.db.dropDatabase(done);
	});

	it('should create new dashboard in database responds with a 201 (Created)', function (done) {
		chai.request(app)
			.post('/api/dashboard')
			.send()
			.end(function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
	});


	it('should get information of dashboard by id responds with a 200', function (done) {  
		var newDashboard = new Dashboard();
		newDashboard.save(function(err, data) {
			chai.request(app)
			.get('/api/dashboard/' + data._id)
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('_id');
				res.body._id.should.equal(data.id);
				done();
			});
		});
	});

	it('should add an option to Dashboard options on /api/dashboard/addOption/:id PUT', function(done) {
		var newDashboard = new Dashboard();
		newDashboard.save(function(err, data) {
			chai.request(app)
				.put('/api/dashboard/addOption/' + data._id)
				.send({
					subCategoryId: data._id,
					userId: data._id
				})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('options');
					res.body.should.have.property('voters');
					done();
				});
		});
	});

	it('should skip adding option to existing voter to dashboard', function (done) {
		var newDashboard = new Dashboard();
		newDashboard.save(function(err, data) {
			chai.request(app)
			.put('/api/dashboard/addOption/' + data._id)
			.send({
				subCategoryId: data._id,
				userId: data._id
			})
			.end(function(err, res) {
				chai.request(app)
				.put('/api/dashboard/addOption/' + data._id)
				.send({
					subCategoryId: data._id,
					userId: data._id
				})
				.end(function(err, res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('options');
					res.body.should.have.property('voters');
					done();
				});
			});
		});
	});

	it('should delete an option from Dashboard options on /api/dashboard/eleminateOptions/:id PUT', function(done) {
		var newDashboard = new Dashboard();
		newDashboard.save(function(err, data) {
			Dashboard.findOneAndUpdate({_id: data._id}, {$push: { options: {subCategoryId: '57a336baaf059e280e510c45'} }}, {new: true}, function (err, dashboard) {
				chai.request(app)
					.put('/api/dashboard/eleminateOptions/' + data._id)
					.send({'subCategoryIds': ['57a336baaf059e280e510c45']})
					.end(function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('_id');
						res.body.options.should.have.lengthOf(0);
						res.body.options.length.should.equal(0);
						done();
					});
			});
		});
	});

	it('should respond with an 500 error when trying to eleminate option to non-existence option', function (done) {  
		chai.request(app)
		.put('/api/dashboard/eleminateOptions/1')
		.send({subCategoryId: '1'})
		.end(function(err, res) {
			res.should.have.status(500);
			done();
		});
	});

	it('should add new key to voting object', function (done) {
		var newDashboard = new Dashboard();
		newDashboard.save(function(err, data) {
			Dashboard.findOne({_id: data._id}, function (err, dashboard) {
				chai.request(app)
				.put('/api/dashboard/voteForOption/' + data._id)
				.send({
					userId: 'testuserId',
					subCategoryId: '57a336baaf059e280e510c45'
				})
				.end(function(err, res) {
					res.should.have.status(200);
					var voting = JSON.parse(res.body.voting);
					voting.testuserId.should.equal('57a336baaf059e280e510c45');
					done();
				});
			});
		});
	});

	it('should respond with an 500 error when trying to eleminate option to non-existence option', function (done) {  
		chai.request(app)
		.put('/api/dashboard/eleminateOptions/1')
		.end(function(err, res) {
			res.should.have.status(500);
			done();
		});
	});
});