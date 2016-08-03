var expect = require('chai').expect;
var mongoose = require('mongoose');
var path = require('path')
var Categories = require(path.join(__dirname,'..','./categoriesSchema/categoryModel.js'));

describe('Categories Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Categories()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Categories.schema).to.exist;
  });
});