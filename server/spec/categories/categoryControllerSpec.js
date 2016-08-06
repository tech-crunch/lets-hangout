var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require("supertest");
var app = require('../../server.js');
var Categories = require('../../categories/categoryModel.js');
var should = chai.should();
chai.use(chaiHttp);
describe('Categories Controller', function () {
  it('should create new category in database responds with a 201 (Created)', function (done) {
      chai.request(app)
      .post('/api/categories')
      .send({
        name:'farah',
        poster:'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg'
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('poster');
        res.body.should.have.property('_id');
        done();
      });
  });
  it('should get all categories ', function (done) {  
      chai.request(app)
      .get('/api/categories')
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         done();
  
     });
   })
   it('should add new child id to array of objectIds', function (done) {
      chai.request(app)
      .put('/api/categories/addChild/:id')
      .send({
        id:'1234'
      })
      .end(function(err, res){
        //res.should.have.property('id');
        //res.should.have.lengthOf(1);
        done();
      });
   })

});
