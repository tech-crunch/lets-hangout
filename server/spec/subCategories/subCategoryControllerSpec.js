var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require("supertest");
var app = require('../../server.js');
var SubCategory = require('../../subCategories/subCategoryModel.js');
var mongoose = require('mongoose');

var should = chai.should();
chai.use(chaiHttp);

describe('SubCategory Controller', function () {

  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  it('should create new subCategory in database and responds with a 201 (Created)', function (done) {
    var testObj = {
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie'
    };
    chai.request(app)
      .post('/api/subCategory')
      .send(testObj)
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('poster');
        res.body.should.have.property('name');
        res.body.should.have.property('details');
        res.body.poster.should.equal(testObj.poster);
        res.body.name.should.equal(testObj.name);
        res.body.details.should.equal(testObj.details);
        done();
      });
  });

  it('should get information of a subCategory by id and responds with a 200', function (done) {  
    var newSubCategory = new SubCategory({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie'
    });
    newSubCategory.save(function(err, data) {
      chai.request(app)
      .get('/api/subCategory/'+data._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('poster');
        res.body.should.have.property('name');
        res.body.should.have.property('details');
        res.body.poster.should.equal(data.poster);
        res.body.name.should.equal(data.name);
        res.body.details.should.equal(data.details);
        done();
      });
    });
  });

  it('should get children array of a subCategory by id and responds with a 200', function (done) {  
    var newSubCategory = new SubCategory({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie',
      children: ['ab12','cd34','de56']
    });
    newSubCategory.save(function(err, data) {
      chai.request(app)
      .get('/api/subCategory/getChildren'+data._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('children');
        res.body.children.should.deep.equal(data.children);
        done();
      });
    });
  });

});
