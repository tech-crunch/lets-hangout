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
        var mockResponse = [
          {
            "name": "Restaurants",
            "poster": "https://s-media-cache-ak0.pinimg.com/236x/4c/21/73/4c217333cba41f88a4d6e6bee91a3525.jpg",
          },
          {
            "name": "Movies",
            "poster": "https://thumbs.dreamstime.com/z/cinema-poster-design-template-popcorn-box-disposable-cup-beverages-straw-film-strip-clapper-board-ticket-detailed-44098150.jpg",
          }
        ];

        $httpBackend.expect('GET', baseUrl + '/api/categories').respond(mockResponse);

        Categories.getAll().then(function (categories) {
          expect(categories).toEqual(mockResponse);
        });
        $httpBackend.flush();
      });
    });
  });
});