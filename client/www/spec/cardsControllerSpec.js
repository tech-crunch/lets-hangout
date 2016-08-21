'use strict';
describe('Testing AngularJS Zarad Profile Page', function(){
    beforeEach(angular.mock.module('lets-hangout'));
    beforeEach(angular.mock.module('lets-hangout.services'));
    beforeEach(angular.mock.module('ionic'));

    describe('Testing CardsController', function(){
      var scope , ctrl, $window;
      var $q , deferred, store, Categories;
      beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _Categories_, _store_, _$timeout_){
        scope = $rootScope.$new();
        store = _store_;
        store.set('userProfile', {userId: '123'})
        ctrl = $controller('CardsController',{$scope : scope});
        $q =  _$q_;
        deferred = _$q_.defer();
        Categories = _Categories_;
        spyOn(Categories, 'getAll').and.returnValue(deferred.promise);

        $controller('CardsController', { 
          $scope: scope, 
          Categories: _Categories_,
          store: _store_,
          $window: _$window_,
          $timeout: _$timeout_, 
          $q: _$q_ 
        });
      }));

      it('should initialize the data in the scope', function(){
        store = store.set({}, 'userProfile')
        expect(scope.cards).toBeDefined();
      });

      it('should have a function called check color', function(){
        expect(typeof scope.initialize).toBe('function');
      });

      it('should get the Auth services', inject(['Categories', function(Auth){
        expect(Categories.getAll).toBeDefined();
      }]));

      it('should have a member in the window local Storage' , function(){
        expect(store.get('userProfile').userId).toBeDefined();
      })

      // it('should return promise when editing profile', function(){

      //   deferred.resolve({data: {name : 'Movies' , poster: "www.asdfadf.com"}})
      //   scope.initialize();
      //   scope.$digest();
      //   expect(Categories.getAll).toHaveBeenCalled();
      // })

    });
});
