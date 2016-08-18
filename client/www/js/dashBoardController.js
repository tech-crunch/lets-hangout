(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', '$window', '$stateParams',
	'SubCategory', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicModal', 'store', 'Group'];

	function DashBoardController($scope, DashBoard, $location, $window, $stateParams,	
	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store, Group) {

		$scope.dashboardId = $stateParams.id; 

		var userId = store.get('userProfile').userId;

		var optionsAreComplete = false;

		var numOfUsers = 0;

		$scope.options = {};

		$scope.runningOnBrowser = false;

		switch (ionic.Platform.platform()) {
		case 'win32':
		case 'macintel':
		case 'win64':
			$scope.runningOnBrowser = true;
			break;
		}

		$scope.getStyle = function() {
			if ($scope.runningOnBrowser) {
				switch ($scope.options.length) {
				case 1:
					return 'width: 20em; float: left; margin-left: 35%;';
				default:
					return 'width: 20em; float: left; margin-left: 3%;';
				}
			}
			return 'width: 100%;';
		};

		$scope.getImgSize = function() {
			return $scope.runningOnBrowser ? 'height: 20em;' : '';
		};

		$scope.getDivSize = function() {
			return $scope.runningOnBrowser ? 'height: 18.85em;' : '';
		};

		$scope.switch = function (index) {
			$scope.flag[index] = !$scope.flag[index];
		};

		$scope.initialize = function() {
			DashBoard.getInfo($scope.dashboardId)
			.then( function(data) {
				// if a user hasn't swiped for option yet, navigate him to the swiping page
				if (data.voters.indexOf(userId) === -1) {
					$location.path('/cards/' + $scope.dashboardId);
				} else { // show the votes
					var optionsIds = data.options;
					var voting = JSON.parse(data.voting);
					var totalVotes = Object.keys(voting).length;
					SubCategory.getSubCategories(optionsIds)
					.then(function(response) {
						$scope.options = response;
						$scope.flag = [];
						for (var i = 0; i < $scope.options.length; i++) {
							$scope.options[i].numOfVotes = 0;
							for (var key in voting) {
								if (voting[key] === $scope.options[i]._id) {
									$scope.options[i].numOfVotes++;
								}
							}
							$scope.flag.push(true);
						}
						$scope.eleminateOptions();
					})
					.catch(function(error) {
						console.log(error);
					});
					Group.groupInfo(data.groupId)
					.then(function(response) {
						var optionsObj = {};
						var repeatedOptions = 0;
						for (var i = 0; i < optionsIds.length; i++) {
							if (!optionsObj[optionsIds[i]]) {
								optionsObj[optionsIds[i]] = 0;
							}
							optionsObj[optionsIds[i]]++;
						}
						for (var key in optionsObj) {
							if (optionsObj[key] !== 1) {
								repeatedOptions++;
							}
						}
						numOfUsers = response.users.length;
						// TODO: give users ability to revote after eliminating
						// console.log(totalVotes);
						// console.log(repeatedOptions);
						optionsAreComplete = (optionsIds.length - repeatedOptions) === numOfUsers ? true : false;
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
				DashBoard.voteForOption($scope.dashboardId, optionId, userId)
				.then( function(data) {
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
			var votesNum = 0;
			var maxVotes = 0;
			for (var i = 0; i < $scope.options.length; i++) {
				votesNum += $scope.options[i].numOfVotes;
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
			if (votesNum === numOfUsers) {
				DashBoard.eleminateOptions($scope.dashboardId, optionsToBeEleminated)
				.then(function(data) {
					if (data.options.length < $scope.options.length) {
						$scope.initialize();
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			}
		};	
	}
} 
());
