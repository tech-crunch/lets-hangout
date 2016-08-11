(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

	DashBoardController.$inject = ['$scope', 'DashBoard', '$location', 'SubCategory'];

	function DashBoardController($scope, DashBoard, $location, SubCategory) {

		$scope.dash = {};
		$scope.dash.option = [];
		$scope.dash.subC = [];
		$scope.dash.voting = [];
    var dashBoardID = "57ab0d66c665971c0daea5a4"
  	$scope.getDashBoardInfo = function() {
  		DashBoard.getInfo(dashBoardID)
  		.then (function(data) {
        for (var i = 0; i < data.options.length; i++) {
          var vote = data.options[i].voting;
          var optionID = data.options[i].subCategoryId
          $scope.dash.voting.push(vote)
          $scope.dash.option.push(optionID)
          SubCategory.getInfo(data.options[i].subCategoryId)
  		   .then(function(subCat){
            $scope.dash.subC.push(subCat)
          })
        }
  		})
  	}
    $scope.getDashBoardInfo();


		$scope.createNewDashBoard = function() {
			DashBoard.createNew()
			.then( function (data) {
				console.log(data);
			})
			.catch(function(err) {
				console.log(err);
			});
		};
			
		$scope.eleminateOptions = function(subID) {
			DashBoard.eleminateOptions(dashBoardID, subID )
			.then( function(data) {
				console.log(data);
			})
			.catch( function(err) {
				console.log(err);
			});
		};

		$scope.voteForOption = function(optionID) {
			DashBoard.voteForOption(dashBoardID, optionID)
			.then( function(data) {
				return data;
			})
			.catch(function(err) {
				console.log(err);
			});
		};
	}  
} ());