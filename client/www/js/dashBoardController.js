(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['$scope','DashBoard', '$location','$window', 'SubCategory'];

    function DashBoardController($scope, DashBoard, $location, $window, SubCategory) {
	 
     $scope.dash = {};
     $scope.dash.option = [];
     $scope.dash.subC = [];
     $scope.dash.voting = [];
     $scope.dash.ids = [];
    var dashBoardID = "57ab0d66c665971c0daea5a4"
  	$scope.getDashBoardInfo = function() {
  		DashBoard.getInfo(dashBoardID)
  		.then (function(data) {
        for (var i = 0; i < data.options.length; i++) {
          var vote = data.options[i].voting;
          var optionID = data.options[i].subCategoryId
          var id = data.options[i]._id;
          $scope.dash.ids.push(id)
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
      	.then( function (data){
        		console.log(data)
      	})
      	.catch(function(err){
      		console.log(err)
      	})
    	}
    $scope.eleminate = function(id, datas){
    DashBoard.eleminateOptions(id,datas)
              .then( function(data){
                // $window.location.reload();
              })
              .catch( function(err){
                console.log(err)
              })
    }
    $scope.eleminateOptions = function() {
      var len = $scope.dash.option.length
      var max = Math.max.apply(Math, $scope.dash.voting)
      console.log(max)
      for (var i = 0; i < len ; i++) { 
          var minVoting = Math.min.apply(Math, $scope.dash.voting)
          var index = $scope.dash.voting.indexOf(minVoting)
          if($scope.dash.option.length > 1 && minVoting !== max){
              $scope.eleminate(dashBoardID, $scope.dash.option[index])
          }
      }
    }

    $scope.voteForOption = function(optionID) {
      DashBoard.voteForOption(dashBoardID , optionID)
      .then( function(data) {
        $window.location.reload(); 
        })
      .catch(function(err) {
        console.log(err)
      })
    }

//     var func = function(){
//     var arr = [];
//     for (var i = 0; i < $scope.dash.voting.length; i++) {
//       arr.push($scope.dash.voting[i])
//     }
//     console.log(arr, "hgjxf")
// }
// func()

    
    //var chosenOption = "57ab0bc1c665971c0daea5a3"
    $scope.getChosenOption = function(){
      var maxi = Math.max.apply(Math, $scope.dash.voting)
      var maxIndex =  $scope.dash.voting.indexOf(maxi)
      var chosenOption = $scope.dash.ids[maxIndex]
      console.log(maxi)
         SubCategory.getInfo(chosenOption)
         .then( function(data) {
          console.log(data)
         })
        .catch( function(err){
          console.log(err)
        })
    }


   //  $scope.showAlert = function() {
  
   //    var alertPopup = $ionicPopup.alert({
   //       title: 'Title',
   //       template: 'Alert message'
   //    });

   //    alertPopup.then(function(res) {
   //       // Custom functionality....
   //    });
   // };



   }      
} 
());
