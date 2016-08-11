(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', '$scope', 'auth', 'store'];

	function HomeController($state, $scope, auth, store) {
		var vm = this;

		vm.auth = auth;

		vm.login = login;
		vm.logout = logout;

		vm.userName;

		$scope.$on('$ionicView.enter', function (viewInfo, state) {
			if (store.get('profile')) {
				vm.userName = store.get('profile').name;
			}
		});

		function login() {
			$state.go('login');
		}

		function logout() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			store.remove('accessToken');
			store.remove('refreshToken');
			vm.userName = null;
		}
	}
} ());