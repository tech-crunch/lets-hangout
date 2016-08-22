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
		beforeEach(inject(function($controller, $rootScope, _auth_, _$q_, _store_, _$timeout_) {
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

		it('should have a function', function() {
			
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

		// it('should return promise when editing profile', function(){

		//   deferred.resolve({data: {name : 'Movies' , poster: "www.asdfadf.com"}})
		//   scope.initialize();
		//   scope.$digest();
		//   expect(Categories.getAll).toHaveBeenCalled();
		// })

	});

	describe('Testing DashBoardController', function() {
		var scope, ctrl, $window, $q, deferred, store, auth;
		beforeEach(inject(function($controller, $rootScope, _auth_, _$q_, _store_, _$timeout_) {
			scope = $rootScope.$new();
			store = _store_;
			store.set('userProfile', {userId: '123'});
			ctrl = $controller('DashBoardController', {$scope: scope});

			$controller('DashBoardController', { 
				$scope: scope, 
				store: _store_,
				auth: _auth_,
				$timeout: _$timeout_, 
				$q: _$q_ 
			});
		}));

		it('should have a function', function() {
			
		});

	});
});
