var expect = require('chai').expect;
var mongoose = require('mongoose');
var app = require('../server.js');
var request = require('supertest')
var DashboardController = require('../Dashboard/DashboardController');
var Dashboard = require('../Dashboard/DashboardModel.js');

describe('Dashboard Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Dashboard()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Dashboard.schema).to.exist;
  });
});


describe('Dashboard Controller', function () {

  it('should create new dashboard in database responds with a 201 (Created)', function (done) {

        request(app)
          .post('/api/dashboard')
          .send()
          .expect(201, done);

      });

  
});

