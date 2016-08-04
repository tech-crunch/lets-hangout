var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require("supertest");
var app = require('../../server.js');
//var SubCategory = require('../../SubCategories/SubCategoryModel.js')

var should = chai.should();
chai.use(chaiHttp);

describe('SubCategory Controller', function () {

  it('should create new subCategory in database responds with a 201 (Created)', function (done) {
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

});
