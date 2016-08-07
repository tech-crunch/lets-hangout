var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require("supertest");
var app = require('../../server.js');
var mongoose = require('mongoose');
var Categories = require('../../categories/categoryModel.js');
var should = chai.should();
chai.use(chaiHttp);

describe('Categories Controller', function () {

  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  it('should create new category in database responds with a 201 (Created) POST', function (done) {
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

  it('should respond with 500 error when trying to create empty Category', function (done) {
    chai.request(app)
      .post('/api/categories')
      .send({})
      .end(function(err, res){
        res.should.have.status(500);
        done();
      })
  });

  it('should get all categories GET', function (done) {  
      var newCategory = new Categories({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'movies'
    });
    newCategory.save(function(err, data) {
      chai.request(app)
      .get('/api/categories')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('poster');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('children');
          res.body[0].poster.should.equal(data.poster);
          res.body[0].name.should.equal(data.name);
          done();
  
     });
    })
  });

   it('should add new child id to array of objectIds PUT', function (done) {
      var newCategory = new Categories({
         name: 'movies',
         poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg'
      });
      console.log(newCategory)
      newCategory.save( function(err, data){
         console.log(data)
         chai.request(app)
         .put('/api/categories/addChild/'+data._id)
         .send({'id': '57a63a1bf6e951d4132847e4'})
         .end(function(err, res){
             res.should.have.status(201);
             res.should.be.json;
             res.body.children[0].should.equal('57a63a1bf6e951d4132847e4')
             res.body.should.be.a('object');
             res.body.should.have.property('_id');
             done();
         });
      })
   });

  it('should respond with an 500 error when trying to add child to non-existence Category', function (done) {  
    chai.request(app)
      .put('/api/categories/addChild/1')
      .send({'id': '57a63a1bf6e951d4132847e4'})
      .end(function(err, res){
        res.should.have.status(500);
        done();
      });
  });
});
