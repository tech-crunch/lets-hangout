var app = require('../../server.js');
var request = require("supertest")(app);
var expect = require('chai').expect;
var mongoose = require('mongoose');

describe("SubCategory Controller", function () {


  it("should create new subCategory", function(done) {
    request.post("/api/subCategory")
      .send({
        poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
        name: 'Suicide Squad',
        details: 'Action Movie'
      })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(function (error, result) {
        expect(error).to.equal(null);
        expect(result.res.body.poster).to.equal('http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg');
        expect(result.res.body.name).to.equal('Suicide Squad');
        expect(result.res.body.details).to.equal('Action Movie');
        done();
      });
  });
});