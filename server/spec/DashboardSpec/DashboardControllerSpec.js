var expect = require('chai').expect;
// var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var request = require("supertest");
var app = require('../../server.js');
var DashboardController = require('../../Dashboard/DashboardController');
// var Dashboard = require('../../Dashboard/DashboardModel.js');
var mongoose = require('mongoose');
var Dashboard = mongoose.model('Dashboard');
var agent = request.agent(app);
var should = require('should')


// var should = chai.should();
// chai.use(chaiHttp);
// chai.request('http://localhost:8000')
describe('Dashboard Controller', function () {

  before(function (done) {
      var newDashboard = {};
      agent
      .post('/api/dashboard')
      .end(function(){
        done();
      })
    });
  it('should create new dashboard in database responds with a 201 (Created)', function (done) {
        // request(app)
        //   .post('/api/dashboard')
        //   .send()
        //   .expect(201)
        //   .end(function(err, result){
        //     expect(err).to.equal(null);
        //     done();
        //   });
            var params = {};
            agent
            .post('/api/dashboard')
            .send(params)
            .expect(201)
            .end(function(err, results){
              console.log(results.body)
              results.body.should.have.property('_id');
              done();
            });
        });
  // it('should get information of dashboard by id responds with a 200', function (done) {  
  //   var newDashboard = new Dashboard();
  //   newDashboard.save(function(err, data) {
  //     chai.request(app)
  //     .get('/api/dashboard/'+data._id)
  //     .end(function(err, res){
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('_id');
  //       res.body._id.should.equal(data.id);
  //       done();
  //     });
  //   });
  // });
});

