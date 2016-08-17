(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', '$window', '$stateParams',
	'SubCategory', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicModal', 'store', 'Group'];

	function DashBoardController($scope, DashBoard, $location, $window, $stateParams,	
	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store, Group) {

		var dashboardId = $stateParams.id; 

		var userId = store.get('userProfile').userId;

		var optionsAreComplete = false;

		var numOfUsers = 0;

		$scope.options = {};

		$scope.switch = function (index) {
			$scope.flag[index] = !$scope.flag[index];
		};

		$scope.initialize = function() {
			DashBoard.getInfo(dashboardId)
			.then( function(data) {
				// if a user hasn't swiped for option yet, navigate him to the swiping page
				if (data.voters.indexOf(userId) === -1) {
					$location.path('/app/cards/' + dashboardId);
				} else { // show the votes
					var optionsIds = data.options;
					var voting = JSON.parse(data.voting);
					SubCategory.getSubCategories(optionsIds)
					.then(function(response) {
						$scope.options = response;
						for (var i = 0; i < $scope.options.length; i++) {
							$scope.options[i].numOfVotes = 0;
							for (var key in voting) {
								if (voting[key] === $scope.options[i]._id) {
									$scope.options[i].numOfVotes++;
								}
							}
							$scope.flag = [];
							for (var i = 0; i < $scope.options.length; i++) {
								$scope.flag.push(true);
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
					Group.groupInfo(data.groupId)
					.then(function(response) {
						numOfUsers = response.users.length;
						optionsAreComplete = optionsIds.length === numOfUsers ? true : false;
					})
					.catch(function(error) {
						console.log(error);
					});
				}
			});
		};

		$scope.initialize();

		$scope.voteForOption = function(optionId) {
			if (optionsAreComplete) {
				DashBoard.voteForOption(dashboardId, optionId, userId)
				.then( function(data) {
					console.log(data);
					$scope.eleminateOptions();
					$scope.initialize();
				})
				.catch(function(err) {
					console.log(err);
				});
			} else {
				$ionicPopup.alert({
					title: 'Please wait until all options are chosen'
				});
			}
		};

		$scope.eleminateOptions = function() {
			var totalVotes = 0;
			var maxVotes = 0;
			for (var i = 0; i < $scope.options.length; i++) {
				totalVotes += $scope.options[i].numOfVotes;
				if ($scope.options[i].numOfVotes > maxVotes) {
					maxVotes = $scope.options[i].numOfVotes;
				}
			}
			
			var optionsToBeEleminated = [];
			for (var i = 0; i < $scope.options.length; i++) {
				if ($scope.options[i].numOfVotes < maxVotes) {
					optionsToBeEleminated.push($scope.options[i]._id);
				}
			}
			console.log(optionsToBeEleminated);
			// DashBoard.eleminateOptions(dashboardId, subCategoriesIds)
			// .then(function( data) {
			// 	$scope.initialize();
			// })
			// .catch(function(err) {
			// 	console.log(err);
			// });
		};	
	}
} 
());
