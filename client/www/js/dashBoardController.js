(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', '$window', '$stateParams',
	'SubCategory', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicModal', 'store'];

	function DashBoardController($scope, DashBoard, $location, $window, $stateParams,	
	SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, store) {

		// redirect the user to the cards page if he hasn't made a choice yet	
		$scope.subCatID = [];
		$scope.subC = [];
		$scope.vote = [];
		var dashBoardID = $stateParams.id; 

		$scope.getDashBoardInfo = function() {
			DashBoard.getInfo(dashBoardID)
			.then (function(data) {
				var voting = JSON.parse(data.voting);
				for (var i = 0; i < data.options.length; i++) {
					var optionID = data.options[i].subCategoryId;
					$scope.subCatID.push(optionID);
					
					SubCategory.getInfo(data.options[i].subCategoryId)
					.then( function(subCat) {
						var counter = 0;
						for (var key in voting) {
							if (voting[key] === subCat._id) {
								counter++;
							}
						}
						$scope.subC.push(subCat);
						$scope.vote.push(counter);
					});
				}
			});
		};

		$scope.getDashBoardInfo();

		$scope.showAlert = function(name, details) {
			var alertPopup = $ionicPopup.alert({
				title: name,
				template: details
			});
		};

		$scope.eleminate = function(id, datas) {
			DashBoard.eleminateOptions(id, datas)
			.then(function( data) {
				// TODO: Refresh the Page
			})
			.catch(function(err) {
				console.log(err);
			});
		};

		var elemination = [];
		$scope.eleminateOptions = function() {
			var len = $scope.subCatID.length;
			var max = Math.max.apply(Math, $scope.vote);
			for (var i = 0; i < len; i++) { 
				var minVoting = Math.min.apply(Math, $scope.vote);
				var index = $scope.vote.indexOf(minVoting);
				if ($scope.subCatID.length > 1 && minVoting !== max) {
					elemination.push($scope.subCatID[index]);
				}
				$scope.vote.splice(index, 1);
			}
			$scope.eleminate(dashBoardID, elemination);
		};

		var userID = store.get('userProfile').userId;
		$scope.voteForOption = function(optionID) {
			var userID = store.get('userProfile').userId;
			DashBoard.voteForOption(dashBoardID, optionID, userID)
			.then( function(data) {
				//TODO refresh page
			})
			.catch(function(err) {
				console.log(err);
			});
		};

		var template;

		$scope.getChosenOption = function() {
			var max = Math.max.apply(Math, $scope.vote);
			var maxIndex = $scope.vote.indexOf(max);
			var chosenOption = $scope.subCatID[maxIndex];
			SubCategory.getInfo(chosenOption)
			.then(function(data) {
				template = data.poster;
				$scope.showImage();
			})
			.catch( function(err) {
				console.log(err);
			});
		};


		$ionicModal.fromTemplateUrl('image-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.openModal = function() {
			$scope.modal.show();
		};

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});

		$scope.showImage = function() {
			$scope.imageSrc = template;
			$scope.openModal();
		};  
		
	}
} 
());
