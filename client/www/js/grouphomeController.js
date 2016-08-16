(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('grouphomeController', grouphomeController);

	grouphomeController.$inject = ['$scope', '$state', '$timeout', '$location', '$ionicActionSheet', 'Group', '$stateParams', '$ionicPopup', 'Users', 'store'];

	function grouphomeController($scope, $state, $timeout, $location, $ionicActionSheet, Group, $stateParams, $ionicPopup, Users, store) {

		// dashboards Information in one group
		$scope.data = [];

		var init = function () {
			Group.groupInfo($stateParams.groupID)
			.then(function (group) {
				for (var i = 0; i < group.dashboard.length; i++) {
					Group.dashboardInfo(group.dashboard[i])
						.then(function (dashboard) {
							$scope.data.push(dashboard);
						});
				}
			})
			.catch(function (err) {
				console.log(err);
			});
		};   

		init();

	/////
		$scope.showActionsheet = function() {
		
			$ionicActionSheet.show({
				titleText: 'Group Settings',
				buttons: [
					{ text: 'Show Members' },
					{ text: 'Add Friend' },
				],
				destructiveText: 'Delete Group',
				cancelText: 'Cancel',

				cancel: function() {
					console.log('CANCELLED');
				},
				buttonClicked: function(index) {
					console.log('BUTTON CLICKED', index);
					if (index === 1) {

						//$location.path('/groups/friends/' + $stateParams.groupID);
						allFriends();
						$scope.showAlert();
					}
					
					if (index === 0) {
						//move to  groupFriends Page to delete
						// $location.path('/groups/members/' + $stateParams.groupID);
						groupFriends();
						$scope.popup1();

					}

				},
				destructiveButtonClicked: function() {
					// delete group
					Group.deletingGroup($stateParams.groupID)
						.then(function (data) {
							$location.path('/groups');
						});
				}
			});
		};

		// functions for show facebook friends list for adding to group
		var allFriends = function () {
			$scope.users = [];
			Users.getFriends(store.get('userProfile').userId)
			.then(function (users) {
				Group.groupInfo($stateParams.groupID)
				.then(function (group) {
					for (var i = 0; i < users.data.length; i++) {
						if (group.users.indexOf(users.data[i].userId) === -1) {
							$scope.users.push(users.data[i]);
						}
					}
				});
			})
			.catch(function (err) {
				console.log(err);
			});
		};
		
		// add friend 
		$scope.addFriend = function (user) {
			Group.addingFriend($stateParams.groupID, user)
				.then(function (data) {
					// document.getElementById(user.username).style.visibility='hidden';
					allFriends();
				})
				.catch(function (err) {
					console.log(err);
				});
		};	

		//try popup
		$scope.showAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Friends',
				template: '<ion-list> <ion-item class="item item-avatar"  ng-repeat="user in users"> <img  src={{user.picture}}> {{user.name}} <button ng-click="addFriend(user.userId)" >add</button> </ion-item></ion-list>',
				scope: $scope
			});
		};

		// functions to show members in group and delete member
		//show friends in group
		var groupFriends = function () {
			$scope.gfriends = [];
			Group.groupInfo($stateParams.groupID)
			.then(function (group) {
				for (var i = 0; i < group.users.length; i++) {
					Users.getOne(group.users[i])
						.then(function (user) {
							$scope.gfriends.push(user.data);
						});
				}
				if ($scope.gfriends.length === 0) {
					// $scope.showAlert();
					console.log('no ff');
				}
			})
			.catch(function (err) {
				console.log(err);
			});
		};
	
		//delete friend from group
		$scope.deleteFriend = function (user) {
			Group.deletingFriend($stateParams.groupID, user)
				.then(function (data) {
					groupFriends();
				})
				.catch(function (err) {
					console.log(err);
				});

		};

		$scope.popup1 = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Group Members',
				template: '<ion-list><ion-item ng-repeat="user in gfriends"><img  src={{user.picture}}> {{user.name}}<button ng-click="deleteFriend(user.userId)">delete</button></ion-item></ion-list>',
				scope: $scope
			});
		};
	}

} ());
