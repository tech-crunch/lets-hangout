var expect = require('chai').expect;
var mongoose = require('mongoose');
var SubCategory = require('../../subCategories/subCategoryModel.js');

describe('SubCategory Model', function () {

  it('SubCategory should be a Mongoose model', function () {
    expect(new SubCategory()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(SubCategory.schema).to.exist;
  });


});
