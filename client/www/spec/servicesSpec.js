'use strict';

describe('Services', function () {
  var baseUrl = 'http://letsshangout.herokuapp.com';
  // Before each test load our lets-hangout.services module
  beforeEach(angular.mock.module('lets-hangout.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('Categories factory', function() {
    var $httpBackend, Categories;

    // Before each test set our injected Categories factory (_Categories_) to our local Users variable
    beforeEach(inject(function(_$httpBackend_, _Categories_) {
      Categories = _Categories_;
      $httpBackend = _$httpBackend_;
    }));

    // A test to verify the Categories factory exists
    it('Categories factory should exist', function() {
      expect(Categories).toBeDefined();
    });
    
    describe('.getAll()', function() {
      // A test to verify the method getAll exists
      it('getAll should be exist', function() {
        expect(Categories.getAll).toBeDefined();
      });

      it('getAll should get categories data 200(SUCCESS)', function() {
        $httpBackend
            .when(baseUrl + 'api/categories/')
            .respond (200); 
      });
    });
  });
});