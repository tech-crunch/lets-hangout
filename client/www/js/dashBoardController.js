(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', '$window', '$stateParams',
	'SubCategory', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicModal', 'store'];

	function DashBoardController($scope, DashBoard, $location, $window, $stateParams,	
	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store) {
	
		$scope.subCatID = [];
		$scope.subC = [];
		$scope.vote = [];

		var dashBoardID = $stateParams.id; 

		var userId = store.get('userProfile').userId;

		$scope.options = {};

		$scope.initialize = function() {
			DashBoard.getInfo(dashBoardID)
			.then( function(data) {
				// if a user hasn't swiped for option yet, navigate him to the swiping page
				if (data.voters.indexOf(userId) === -1) {
					$location.path('/app/cards/' + dashBoardID);
				} else { // show the votes
					var optionsIds = data.options;
					var voting = JSON.parse(data.voting);
					SubCategory.getSubCategories(optionsIds)
					.then(function(response) {
						$scope.options = response;
						for(var i=0; i<$scope.options.length; i++){
							$scope.options[i].numOfVotes = 0;
							for(var key in voting){
								if(voting[key] === $scope.options[i]._id){
									$scope.options[i].numOfVotes++;
								}
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				}
			});
		};

		$scope.initialize();


		// $scope.eleminate = function(id, datas) {
		// 	DashBoard.eleminateOptions(id, datas)
		// 	.then(function( data) {
		// 		// TODO: Refresh the Page
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err);
		// 	});
		// };

		// var elemination = [];

		// $scope.eleminateOptions = function() {
		// 	var len = $scope.subCatID.length;
		// 	var max = Math.max.apply(Math, $scope.vote);
		// 	for (var i = 0; i < len; i++) { 
		// 		var minVoting = Math.min.apply(Math, $scope.vote);
		// 		var index = $scope.vote.indexOf(minVoting);
		// 		if ($scope.subCatID.length > 1 && minVoting !== max) {
		// 			elemination.push($scope.subCatID[index]);
		// 		}
		// 		$scope.vote.splice(index, 1);
		// 	}
		// 	$scope.eleminate(dashBoardID, elemination);
		// };

		
		// $scope.voteForOption = function(optionID) {
		// 	var userID = store.get('userProfile').userId;
		// 	DashBoard.voteForOption(dashBoardID, optionID, userID)
		// 	.then( function(data) {
		// 		//TODO refresh page
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err);
		// 	});
		// };

		// var template;

		// $scope.getChosenOption = function() {
		// 	var max = Math.max.apply(Math, $scope.vote);
		// 	var maxIndex = $scope.vote.indexOf(max);
		// 	var chosenOption = $scope.subCatID[maxIndex];
		// 	SubCategory.getInfo(chosenOption)
		// 	.then(function(data) {
		// 		template = data.poster;
		// 		$scope.showImage();
		// 	})
		// 	.catch( function(err) {
		// 		console.log(err);
		// 	});
		// };

		// $scope.showAlert = function(name, details) {
		// 	var alertPopup = $ionicPopup.alert({
		// 		title: name,
		// 		template: details
		// 	});
		// };

		// $ionicModal.fromTemplateUrl('image-modal.html', {
		// 	scope: $scope,
		// 	animation: 'slide-in-up'
		// }).then(function(modal) {
		// 	$scope.modal = modal;
		// });

		// $scope.openModal = function() {
		// 	$scope.modal.show();
		// };

		// $scope.closeModal = function() {
		// 	$scope.modal.hide();
		// };

		// //Cleanup the modal when we're done with it!
		// $scope.$on('$destroy', function() {
		// 	$scope.modal.remove();
		// });

		// $scope.showImage = function() {
		// 	$scope.imageSrc = template;
		// 	$scope.openModal();
		// };  
		
	}
} 
());
