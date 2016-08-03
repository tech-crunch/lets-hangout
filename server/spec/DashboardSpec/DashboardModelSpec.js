var expect = require('chai').expect;
var mongoose = require('mongoose');
var Dashboard = require('../../Dashboard/DashboardModel.js');


describe('Dashboard Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Dashboard()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Dashboard.schema).to.exist;
  });
});

