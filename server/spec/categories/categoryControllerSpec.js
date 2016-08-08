var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var mongoose = require('mongoose');
var Categories = require('../../categories/categoryModel.js');
var should = chai.should();
chai.use(chaiHttp);

var postCategory = function(body, expectations){
  chai.request(app)
    .post('/api/categories')
    .send(body)
    .end(expectations);
};
var getCategories = function(body,expectations){
  chai.request(app)
    .get('/api/categories')
    .send(body)
    .end(expectations);
};
var addChildToCat = function(body, id, expectations){
  chai.request(app)
    .put('/api/categories/addChild/'+id)
    .send(body)
    .end(expectations);
};

describe('Categories Controller', function () {

  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  it('should create new category in database responds with a 201 (Created) POST', function (done) {
      var testObj = {
        name:'farah',
        poster:'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg'
      }
      postCategory(testObj,
      function(err, res){
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
    postCategory({},
      function(err, res){
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
      getCategories(data,
        function(err, res){
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
      newCategory.save( function(err, data){
         addChildToCat({id:'57a63a1bf6e951d4132847e4'}, data._id, 
          function(err, res){
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
    addChildToCat({id:'57a63a1bf6e951d4132847e4'},1,
      function(err, res){
        res.should.have.status(500);
        done();
      });
  });
});
