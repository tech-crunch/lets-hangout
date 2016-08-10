(function () {
    'use strict';

    angular
        .module('lets-hangout')
        .controller('DashBoardController', DashBoardController)

    DashBoardController.$inject = ['$scope','DashBoard', '$location', 'SubCategory'];

    function DashBoardController($scope, DashBoard, $location, SubCategory) {
	 
     $scope.dash = {};
     $scope.dash.subC = [];
     $scope.dash.voting = [];
  	//var dashBoardID = window.location.href.split('/')[5];
    var dashBoardID = "57ab0d66c665971c0daea5a4"
  	$scope.getDashBoardInfo = function() {
  		DashBoard.getInfo(dashBoardID)
  		.then (function(data) {
        for (var i = 0; i < data.options.length; i++) {
          var vote = data.options[i].voting;
          $scope.dash.voting.push(vote)
          console.log($scope.dash.voting)
          SubCategory.getInfo(data.options[i].subCategoryId)
  		   .then(function(subCat){
            $scope.dash.subC.push(subCat)
          })
        }
      console.log($scope.dash.subC)
  		})
  	}
    $scope.getDashBoardInfo();

   	$scope.createNewDashBoard = function() {
      	DashBoard.createNew()
      	.then( function (data){
        		console.log(data)
      	})
      	.catch(function(err){
      		console.log(err)
      	})
    	}
     
    	$scope.voteForOption = function() {
        DashBoard.voteForOption(dashBoardID, $scope.vote)
        .then( function(data) {
         console.log(data)
          })
        .catch(function(err) {
          console.log(err)
        })
      }
    	
    // $scope.eleminateOptions = function(subID) {
    //   console.log(subID, "farooh")
    //   DashBoard.eleminateOptions(dashBoardID, subID )
    //   .then( function(data){
    //     console.log(data)
    //   })
    //   .catch( function(err){
    //     console.log(err)
    //   })
    }    // }
  } 
());