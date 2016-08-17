'use strict';

describe('DashBoardController', function() {
  var $scope, $rootScope, createController, $location, DashBoard, $httpBackend, $window, $stateParams,	
	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store;

  	beforeEach(function () {
        module('lets-hangout');
    });
  	var controller;

  	beforeEach(inject(function ($injector) {
		// mock out our dependencies
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		DashBoard = $injector.get('DashBoard');
		$location = $injector.get('$location');
		$scope = $rootScope.$new();
		createController = function(){
			$controller('DashBoardController', {
            	'$scope': $scope
       		});
		}
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a subC property on the $scope', function() {
	    expect($scope.subC).toBe('object')
    });
});
