'use strict';

describe('Testing group Controller', function() {
	beforeEach(angular.mock.module('lets-hangout'));
	beforeEach(angular.mock.module('lets-hangout.services'));
	beforeEach(angular.mock.module('ionic'));

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