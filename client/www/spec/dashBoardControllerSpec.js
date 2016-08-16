'use strict';

describe('DashBoardController', function () {
	var $scope, $rootScope, createController, DashBoard, $httpBackend;

	beforeEach(module('lets-hangout'));
	beforeEach(inject(function ($injector) {

		// mock out our dependencies
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		DashBoard = $injector.get('DashBoard');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function () {
			return $controller('DashBoardController', {
				$scope: $scope,
				DashBoard: DashBoard
			});
		};

	}));

	it('should have subC property on the $scope', function () {
		createController();
		expect($scope.subC).to.be.an('object');
	});

	it('should call `$scope.getDashBoardInfo()` when controller is loaded', function () {
		sinon.spy(DashBoard, 'getInfo');
		$httpBackend.expectGET('/api/dashboard/:id').respond(200);

		createController();
		$httpBackend.flush();

		expect($scope.getDashBoardInfo().called).to.equal(true);
		DashBoard.getInfo.restore();
	})
});