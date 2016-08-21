'use strict';
describe('Testing AngularJS Zarad Profile Page', function(){
    beforeEach(angular.mock.module('lets-hangout'));
    beforeEach(angular.mock.module('lets-hangout.services'));
    beforeEach(angular.mock.module('ionic'));

    describe('Testing messagesController', function(){
      var scope , ctrl, $window;
      var $q , deferred, store;
      beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _store_, _$timeout_){
        scope = $rootScope.$new();
        store = _store_;
        store.set('userProfile', {userId: '123'})
        ctrl = $controller('messagesController',{$scope : scope});

        $controller('messagesController', { 
          $scope: scope, 
          store: _store_,
          $window: _$window_,
          $timeout: _$timeout_, 
          $q: _$q_ 
        });
      }));

      it('should have a function called sendMessage', function(){
        expect(typeof scope.sendMessage).toBe('function');
      });

    });
});
