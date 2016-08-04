var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require("supertest");
var app = require('../../server.js');
var Dashboard = require('../../Dashboard/DashboardModel.js')

var should = chai.should();
chai.use(chaiHttp);

describe('Dashboard Controller', function () {

  it('should create new dashboard in database responds with a 201 (Created)', function (done) {
    chai.request(app)
      .post('/api/dashboard')
      .send()
      .end(function(err, res){
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
      .get('/api/dashboard/'+data._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });
});

