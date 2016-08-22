'use strict';
describe('Testing AngularJS lets hangout Profile Page', function(){
    beforeEach(angular.mock.module('lets-hangout'));
    beforeEach(angular.mock.module('lets-hangout.services'));
    beforeEach(angular.mock.module('ionic'));

    describe('Testing DashBoardController', function(){
      	var scope , ctrl, $window;
      	var $q , deferred, store, Categories, $scope, DashBoard, $location, $window, $stateParams,	
		SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store, Group;
    	beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _store_,
    	_$timeout_, _DashBoard_, $location, $stateParams,	
		_SubCategory_, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, Group){
        	scope = $rootScope.$new();
        	store = _store_;
	        store.set('userProfile', {userId: '123'})
	        ctrl = $controller('DashBoardController',{$scope : scope});
	        $q =  _$q_;
	        deferred = _$q_.defer();
	        // spyOn(DashBoard, 'getInfo').and.returnValue(deferred.promise);

	        $controller('DashBoardController', { 
		        $scope: scope, 
		        SubCategory: _SubCategory_,
		        DashBoard: _DashBoard_,
		        store: _store_,
		        $window: _$window_,
		        $timeout: _$timeout_, 
		        $q: _$q_

	        });
    	}));

	   	it('should initialize the data in the scope', function(){
	        expect(scope.options).toBeDefined();
	    });

	    it('should have a function called initialize', function(){
	        expect(typeof scope.initialize).toBe('function');
	    });

	      // it('should get the DashBoard services', inject(['DashBoard', function(Auth){
	      //   expect(DashBoard.getInfo).toBeDefined();
	      // }]));

	    it('should have a userId in the store local Storage' , function(){
	        expect(store.get('userProfile').userId).toBeDefined();
	    })

	      // it('should return promise when editing profile', function(){

	      //   deferred.resolve({data: {name : 'Movies' , poster: "www.asdfadf.com"}})
	      //   scope.initialize();
	      //   scope.$digest();
	      //   expect(Categories.getAll).toHaveBeenCalled();
	      // })

	   	it('should have a function called getStyle', function(){
	        expect(typeof scope.getStyle).toBe('function');
	    });

	    it('should have a function called getImgSize', function(){
	        expect(typeof scope.getImgSize).toBe('function');
	    });

	  	it('should have a function called getDivSize', function(){
	        expect(typeof scope.getDivSize).toBe('function');
	  	});

	  	it('should have a function called switch', function(){
	    	(typeof scope.switch).toBe('function');
		});

	    it('should have a function called voteForOption', function(){
	    	expect(typeof scope.voteForOption).toBe('function');
	    });

	   	it('should have a function called voteForOption', function(){
	   		expect(typeof scope.voteForOption).toBe('function');
	  	});

	   	it('should have a function called eleminateOptions', function(){
	    	expect(typeof scope.eleminateOptions).toBe('function');
	  	});

    });
});