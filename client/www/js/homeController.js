(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', '$scope', 'auth', 'store', 'Users', 'Group'];

	function HomeController($state, $scope, auth, store, Users, Group) {
		var vm = this;

		vm.auth = auth;

		vm.login = login;

		vm.user = {};

		setInterval( function() {
			if (store.get('Initialized') && !store.get('userProfile')) {
				$state.go('app.login');
			}
		}, 1000);

		$scope.$on('$ionicView.enter', function (viewInfo, state) {
			if (store.get('userProfile')) {
				vm.user = store.get('userProfile');
			}
		});

		function login() {
			$state.go('app.login');
		}

		// Getting Groups and displaying them
		$scope.group = {};
		
		$scope.data = [];
		
		// groups Information
		var init = function () {
			if (store.get('userProfile')) {
				Group.allGroupsByAdmin(store.get('userProfile').userId)
				.then(function (groups) {
					$scope.data.groups = groups;
				})
				.catch(function (err) {
					console.log(err);
				});
			}
		};

		// create new Group
		$scope.createGroup = function () {
			if (store.get('userProfile')) {
				Group.newGroup($scope.group.groupName, store.get('userProfile').userId)
				.then(function (data) {
					init();
				})
				.catch(function (err) {
					console.log(err);
				});
			}
		};

		init();

	}
} ());