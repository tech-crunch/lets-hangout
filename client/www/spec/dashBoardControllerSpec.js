// 'use strict';

// describe('DashBoardController', function() {
//   var $scope, $rootScope, createController, $location, DashBoard, $httpBackend, $window, $stateParams,	
// 	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store, Group;

//   	beforeEach(function () {
//         module('lets-hangout');
//     });
//   	var $controller;

//   	beforeEach(inject(function ($injector) {
// 		// mock out our dependencies

// 		$rootScope = $injector.get('$rootScope');
// 		$httpBackend = $injector.get('$httpBackend');
// 		DashBoard = $injector.get('DashBoard');
// 		$location = $injector.get('$location');
// 		$window = $injector.get('$window');
// 		$stateParams = $injector.get('$stateParams');
// 		SubCategory = $injector.get('SubCategory');
// 		$ionicPopup = $injector.get('$ionicPopup');
// 		$ionicPopover = $injector.get('$ionicPopover');
// 		$ionicLoading = $injector.get('$ionicLoading');
// 		$ionicModal = $injector.get('$ionicModal');
// 		store = $injector.get('store');
// 		Group = $injector.get('Group');
// 		$controller = $injector.get('$controller');

// 		$scope = $rootScope.$new();
// 		createController = function(){
// 			return $controller('DashBoardController', {
//             	$scope: $scope,
//             	$rootScope: $rootScope,
//             	$location: $location,
//             	DashBoard: DashBoard,
//             	$httpBackend: $httpBackend,
//             	$window: $window,
//             	$stateParams: $stateParams,
//             	SubCategory: SubCategory,
//             	$ionicPopup: $ionicPopup,
//             	$ionicLoading:  $ionicLoading,
//             	$ionicPopover: $ionicPopover,
//             	$ionicModal: $ionicModal,
//             	store: store,
//             	Group: Group
//        		});
// 		}
// 		$httpBackend = $httpBackend
//     }));


//     afterEach(function() {
//         $httpBackend.verifyNoOutstandingExpectation();
//        	$httpBackend.verifyNoOutstandingRequest();
//     });

//    	it('should call `$scope.initialize()` when controller is loaded', function () {
//     	// spyOn(DashBoard, 'getInfo');
//     	// $httpBackend.expectGET('/api/dashboard/:id').respond(200);
//      // 	createController();
//     	// $httpBackend.flush();
//     	// $scope.initialize();
//     	// expect(DashBoard.getInfo.called).toEqual(true);
//     	// DashBoard.getInfo.restore();
//     	// expect($scope.options).toBe({});
//   	});
// });
