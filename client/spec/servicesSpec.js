

describe('Categories factory', function() {
  var Categories;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('lets-hangout.services'));

  // Before each test set our injected Users factory (_Categories_) to our local Users variable
  beforeEach(inject(function(_Categories_) {
    Categories = _Categories_;
  }));

  // A simple test to verify the Users factory exists
  it('Categories factory should exist', function() {
    expect(Categories).toBeDefined();
  });
  
  describe('.getAll()', function() {
      // A test to verify the method getAll exists
      it('getAll should be exist', function() {
        expect(Categories.getAll).toBeDefined();
      });
    });
});
