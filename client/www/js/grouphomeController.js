(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('grouphomeController', grouphomeController);

	grouphomeController.$inject = ['$scope', '$state', '$timeout', '$location', '$ionicActionSheet', '$cordovaCamera',
	'$rootScope', 'Group', '$stateParams', '$ionicPopup', 'Users', 'store', 'ionicDatePicker', 'DashBoard'];

	function grouphomeController($scope, $state, $timeout, $location, $ionicActionSheet, $cordovaCamera,
	$rootScope, Group, $stateParams, $ionicPopup, Users, store, ionicDatePicker, DashBoard) {

		// dashboards Information in one group
		$scope.data = [];

		$scope.userIsAdmin = false;

		$scope.groupName = '';

		var userProfile = store.get('userProfile');

		var init = function () {
			Group.groupInfo($stateParams.groupID)
			.then(function (group) {
				$scope.userIsAdmin = group.groupAdmin === userProfile.userId ? true : false;
				$scope.groupName = group.groupName;
				for (var i = 0; i < group.dashboards.length; i++) {
					Group.dashboardInfo(group.dashboards[i])
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

		$scope.showActionsheet = function() {
			
			var buttonClicked = function(index) {
				switch (index) {
				case 0:
					createDashboard();
					break;
				// case 1:
				// 	changeProfilePic();
				// 	break;
				case 1:
					groupFriends();
					$scope.deletingFriendPopUp();
					break;
				case 2:
					allFriends();
					$scope.addingFriendPopUp();
					break;
				}
			};

			var buttons = [
				{ text: 'New Event'},
				//{ text: 'Change Picture'},
				{ text: 'Show Members' }
			];


			if ($scope.userIsAdmin) {
				buttons.push({ text: 'Add Friend' });
			}

			$ionicActionSheet.show({
				titleText: 'Settings',
				buttons: buttons,
				destructiveText: $scope.userIsAdmin ? 'Delete Group' : null,
				cancelText: 'Cancel',

				cancel: function() {
				},

				buttonClicked: buttonClicked,

				destructiveButtonClicked: function() {
					Group.deletingGroup($stateParams.groupID)
					.then(function (data) {
						$state.go('app.home');
					});
				}
			});
		};

		// functions for show facebook friends list for adding to group
		var allFriends = function () {
			$scope.users = [];
			Users.getFriends(userProfile.userId)
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
				allFriends();
			})
			.catch(function (err) {
				console.log(err);
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

		$scope.addingFriendPopUp = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Friends',
				templateUrl: 'templates/popup/addFriend.html',
				scope: $scope
			});
		};

		$scope.deletingFriendPopUp = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Group Members',
				templateUrl: 'templates/popup/removeFriend.html',
				scope: $scope
			});
		};

		var createDashboard = function() {
			var datePickerObj = {
				callback: function (val) {
					var date = new Date(val);
					DashBoard.createNew(date, $stateParams.groupID)
					.then(function(resp) {
						Group.addDashboard($stateParams.groupID, resp.data._id)
						.then(function(response) {
							$location.path('/app/dashBoard/' + resp.data._id);
						});
					})
					.catch(function(error) {
						console.log(error);
					});
				},
				from: new Date()
			};
			ionicDatePicker.openDatePicker(datePickerObj);
		};

		var changeProfilePic = function() {
			var myPopup = $ionicPopup.show({
				title: 'Please Select',
				scope: $scope,
				buttons: [
					{
						text: 'Upload',
						onTap: function() {
							takePhoto({
								type: Camera.PictureSourceType.PHOTOLIBRARY
							});
						}
					},
					{
						text: 'Exit'
					}
				]
			});
		};

		var takePhoto = function(source) {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: source.type,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options) 
			.then(function(imageData) {
				console.log(imageData);
				//uploadToIMGUR('',imageData, function(response){
				var object = {
					username: $scope.data.username,
					image: response.link
				};
			});
		};
	}
} ());
