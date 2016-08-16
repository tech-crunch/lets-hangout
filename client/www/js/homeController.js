(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', '$scope', 'auth', 'store', 'Users'];

	function HomeController($state, $scope, auth, store, Users) {
		var vm = this;

		vm.auth = auth;

		vm.login = login;
		vm.logout = logout;

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

		function logout() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			store.remove('accessToken');
			store.remove('refreshToken');
			store.remove('userProfile');
			vm.user = {};
		}
	}
} ());