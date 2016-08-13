(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', '$window', 'SubCategory', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicModal'];

	function DashBoardController($scope, DashBoard, $location, $window, SubCategory, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal) { 
		$scope.dash = {};
		$scope.dash.option = [];
		$scope.dash.subC = [];
		$scope.dash.voting = [];
		$scope.dash.ids = [];
		$scope.dash.eleminate = [];
		var dashBoardID = '57ab0d66c665971c0daea5a4';
		$scope.getDashBoardInfo = function() {
			DashBoard.getInfo(dashBoardID)
			.then (function(data) {
				for (var i = 0; i < data.options.length; i++) {
					var vote = data.options[i].voting;
					var optionID = data.options[i].subCategoryId;
					var id = data.options[i]._id;
					$scope.dash.ids.push(id);
					$scope.dash.voting.push(vote);
					$scope.dash.option.push(optionID);
					SubCategory.getInfo(data.options[i].subCategoryId)
					.then( function(subCat) {
						$scope.dash.subC.push(subCat);
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

		$scope.createNewDashBoard = function() {
			DashBoard.createNew()
			.then( function (data) {
				console.log(data);
			})
			.catch(function(err) {
				console.log(err);
			});
		};

		$scope.eleminate = function(id, datas) {
			DashBoard.eleminateOptions(id, datas)
			.then(function( data) {
			// $window.location.reload();
			})
			.catch(function(err) {
				console.log(err);
			});
		};

		$scope.eleminateOptions = function() {
			var len = $scope.dash.option.length;
			var max = Math.max.apply(Math, $scope.dash.voting);
			for (var i = 0; i < len; i++) { 
				var minVoting = Math.min.apply(Math, $scope.dash.voting);
				var index = $scope.dash.voting.indexOf(minVoting);
				if ($scope.dash.option.length > 1 && minVoting !== max) {
					$scope.dash.eleminate.push($scope.dash.option[index])
				}
				$scope.dash.voting.splice(index,1)
			}
			$scope.eleminate(dashBoardID, $scope.dash.eleminate);
		};

		$scope.voteForOption = function(optionID) {
			DashBoard.voteForOption(dashBoardID, optionID)
			.then( function(data) {
				$window.location.reload(); 
			})
			.catch(function(err) {
				console.log(err);
			});
		};

		var template;
		$scope.getChosenOption = function() {
			var maxi = Math.max.apply(Math, $scope.dash.voting);
			var maxIndex = $scope.dash.voting.indexOf(maxi);
			var chosenOption = $scope.dash.option[maxIndex];
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
