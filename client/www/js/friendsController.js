(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('friendsController', friendsController);

	friendsController.$inject = ['$scope', '$state', '$timeout', '$location', '$ionicPopup', '$stateParams', 'Group', 'Users', 'store'];

	function friendsController($scope, $state, $timeout, $location, $ionicPopup, $stateParams, Group, Users, store) {

		$scope.data = [];
		$scope.gfriends = [];
		//view friends in user table (in futur facebook friends)
		var allFriends = function () {
			Users.getFriends(store.get('userProfile').userId)
			.then(function (users) {
				console.log(users)
				$scope.users = users.data;
			})
			.catch(function (err) {
				console.log(err);
			});
		};
		allFriends();
		// add friend 
		$scope.addFriend = function (user) {
			Group.addingFriend($stateParams.groupID, user)
				.then(function (data) {
					// document.getElementById(user.username).style.visibility='hidden'; 
				})
				.catch(function (err) {
					console.log(err);
				});
		};

	}

} ());
