var expect = require('chai').expect;
var mongoose = require('mongoose');
var server = require('../../server.js');
var chai = require('chai');
var chaiHTTP = require('chai-http')
var SubCategoryController = require('../../subCategories/subCategoryController');
var SubCategory = require('../../subCategories/subCategoryModel.js');
var should = chai.should();

chai.use(chaiHTTP);

server.listen(8000);

var dbURI = 'mongodb://localhost/test';

describe('SubCategory Controller', function () {

 // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
   mongoose.connect(dbURI, done);
  });


  it('should create new subCategory in the database', function (done) {
    chai.request(server)
    .post('/api/subCategory')
    .type('json')
    .send({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie'
    })
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('poster');
      res.body.should.have.property('name');
      res.body.should.have.property('details');
      res.body.should.have.property('_id');
      res.body.poster.should.equal('http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg');
      res.body.name.should.equal('Suicide Squad');
      res.body.details.should.equal('Action Movie');
      done();
    });
  });
});