'use strict';

describe('Testing Controllers', function() {
	beforeEach(angular.mock.module('lets-hangout'));
	beforeEach(angular.mock.module('lets-hangout.services'));
	beforeEach(angular.mock.module('ionic'));

	describe('Testing messagesController', function() {
		var scope, ctrl, $window, $q, deferred, store;
		beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _store_, _$timeout_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			ctrl = $controller('messagesController', {$scope: scope});

			$controller('messagesController', { 
				$scope: scope, 
				store: _store_,
				$window: _$window_,
				$timeout: _$timeout_, 
				$q: _$q_ 
			});
		}));

		it('should have a function called sendMessage', function() {
			expect(typeof scope.sendMessage).toBe('function');
		});
	});

	describe('Testing LoginController', function() {
		var scope, ctrl, $window, $q, deferred, store, auth;
		beforeEach(inject(function($controller, $rootScope, _auth_, _$q_, _store_, _$timeout_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			ctrl = $controller('LoginController', {$scope: scope});

			$controller('LoginController', { 
				$scope: scope, 
				store: _store_,
				auth: _auth_,
				$timeout: _$timeout_, 
				$q: _$q_ 
			});
		}));

		it('should have a function	', function() {

		});
	});

	describe('Testing HomeController', function() {
		var scope, ctrl, $window, $q, deferred, store, auth;
		beforeEach(inject(function($controller, $rootScope, _auth_, _$q_, _store_, _$timeout_, Group) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			ctrl = $controller('HomeController', {$scope: scope});

			$controller('HomeController', { 
				$scope: scope, 
				store: _store_,
				auth: _auth_,
				$timeout: _$timeout_, 
				$q: _$q_ 
			});
		}));

		
		it('should initialize the data in the scope', function() {
			expect(scope.data).toBeDefined();
			expect(scope.group).toBeDefined();
			expect(scope.group).toBeDefined();
		});

		it('should have a function called createGroup', function() {
			expect(typeof scope.createGroup).toBe('function');
		});		
	});

	describe('Testing CardsController', function() {
		var scope, ctrl, $window, $q, deferred, store, Categories;
		beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _Categories_, _store_, _$timeout_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			ctrl = $controller('CardsController', {$scope: scope});
			$q = _$q_;
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

		it('should initialize the data in the scope', function() {
			expect(scope.cards).toBeDefined();
		});

		it('should have a function called initialize', function() {
			expect(typeof scope.initialize).toBe('function');
		});

		it('should get the Categories services', inject(['Categories', function(Auth) {
			expect(Categories.getAll).toBeDefined();
		}]));

		it('should have a userId in the store local Storage', function() {
			expect(store.get('userProfile').userId).toBeDefined();
		});
	});

	describe('Testing DashBoardController', function() {
		var scope, ctrl, $window, $q, deferred, store, auth, DashBoard, SubCategory, Group, $httpBackend;
		beforeEach(inject(function($controller, $httpBackend, $rootScope, _auth_, _$q_, _store_, _$timeout_, _DashBoard_, _SubCategory_, _Group_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			SubCategory = _SubCategory_;
			DashBoard = _DashBoard_;
			Group = _Group_;
			$httpBackend = $httpBackend; 
			deferred = _$q_.defer();

			$controller('DashBoardController', { 
				$scope: scope, 
				store: _store_,
				auth: _auth_,
				$timeout: _$timeout_, 
				$q: _$q_,
				DashBoard: _DashBoard_,
				SubCategory: _SubCategory_,
				Group: _Group_
			});
		}));

		it('should initialize the data in the scope', function() {
			expect(scope.options).toBeDefined();
		});

		it('should have a function called initialize', function() {
			expect(typeof scope.initialize).toBe('function');
		});

		it('should have a userId in the store local Storage', function() {
			expect(store.get('userProfile').userId).toBeDefined();
		});

		it('should have a function called getStyle', function() {
			expect(typeof scope.getStyle).toBe('function');
		});
 
		it('should have a function called getImgSize', function() {
			expect(typeof scope.getImgSize).toBe('function');
		});

		it('should have a function called getDivSize', function() {
			expect(typeof scope.getDivSize).toBe('function');
		});

		it('should have a function called switch', function() {
			expect(typeof scope.switch).toBe('function');
		});

		it('should have a function called voteForOption', function() {
			expect(typeof scope.voteForOption).toBe('function');
		});

		it('should have a function called voteForOption', function() {
			expect(typeof scope.voteForOption).toBe('function');
		}); 

		it('should have a function called eleminateOptions', function() {
			expect(typeof scope.eleminateOptions).toBe('function');
		});

		it('should get the SubCategory services', inject(['SubCategory', function() {
			spyOn(SubCategory, 'getSubCategories').and.returnValue(deferred.promise);
			expect(SubCategory.getSubCategories).toBeDefined();
		}]));

		it('should get the DashBoard services', inject(['DashBoard', function() {
			expect(DashBoard.getInfo).toBeDefined();
		}]));

		it('should get the Group services', inject(['Group', function() {
			expect(Group.groupInfo).toBeDefined();
		}]));

		it('should get `DashBoard.voteForOption`', inject(['DashBoard', function() {
			expect(DashBoard.voteForOption).toBeDefined();
		}]));

		it('should get `DashBoard.eleminateOptions`', inject(['DashBoard', function() {
			expect(DashBoard.eleminateOptions).toBeDefined();
		}]));

		it('should get `SubCategory.getSubCategories`promises', inject(['SubCategory', function() {
			spyOn(SubCategory, 'getSubCategories').and.returnValue(deferred.promise);
			expect(typeof SubCategory.getSubCategories(12345)).toBe('object');
		}]));

		it('should get `SubCategory.getSubCategories`promises', inject(['SubCategory', function() {
			spyOn(SubCategory, 'getSubCategories').and.returnValue(deferred.promise);
			expect(typeof SubCategory.getSubCategories(1234)).toBe('object');
		}]));
	});

	describe('Testing grouphomeController', function() {
		var scope, ctrl, $window, $q, deferred, store, Group, ionicDatePickerMock, Users;

		beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _Group_, _store_, _Users_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			$q = _$q_;
			deferred = _$q_.defer();
			Group = _Group_;
			Users = _Users_;
			spyOn(Group, 'addingFriend').and.returnValue(deferred.promise);
			ionicDatePickerMock = {
				openDatePicker: jasmine.createSpy('ionicDatePicker spy').and.returnValue(deferred.promise)
			};

			$controller('grouphomeController', { 
				$scope: scope, 
				Group: _Group_,
				store: _store_,
				$window: _$window_,
				$q: _$q_,
				ionicDatePicker: ionicDatePickerMock,
				Users: _Users_
			});
		}));

		it('should initialize the data in the scope', function() {
			expect(scope.data).toBeDefined();
			expect(scope.groupName).toBeDefined();
		});

		it('should start with userIsAdmin populated', function () {
			expect(scope.userIsAdmin).toEqual(false);
		});

		it('should have a function called initialize', function() {
			expect(scope.addFriend).toBeDefined();
		});

		it('should have a userId in the store local Storage', function() {
			expect(store.get('userProfile').userId).toBeDefined();
		});

		it('should get the Group services', inject(['Group', function( ) {
			expect(Group.groupInfo).toBeDefined();
		}]));

		it('should get the Users services', inject(['Users', function( ) {
			expect(Users.getFriends).toBeDefined();
		}]));
	});
});
