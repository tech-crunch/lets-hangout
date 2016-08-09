angular.module('lets-hangout.dashBoard', [])

.controller('dashBoardCtrl', function($scope, DashBoard, $location, SubCategory) {
	 
   $scope.dash = {};
   $scope.dash.subC = []
 
	//var dashBoardID = window.location.href.split('/')[5];
  var dashBoardID = "57a9d6384115c8b405c5c930"
	$scope.getDashBoardInfo = function() {
		DashBoard.getInfo(dashBoardID)
		.then (function(data) {
     // console.log(data.options)
      for (var i = 0; i < data.options.length; i++) {
        SubCategory.getInfo(data.options[i].subCategoryId)
		   .then(function(subCat){
          //console.log(subCat)
          $scope.dash.subC.push(subCat)
        })
      }
      console.log($scope.dash.subC)
		})
	}
  $scope.getDashBoardInfo();

  $scope.newDash={};
 	$scope.createNewDashBoard = function() {
    	DashBoard.createNew()
    	.then( function (data){
      		$scope.newDash = data;
      		console.log(data)
    	})
    	.catch(function(err){
    		console.log(err)
    	})
  	}

  	$scope.addOption = function() {
  		DashBoard.addOption(dashBoardID)
  		.then(function(data) {
  			console.log(data)
  		})

  		}
  	



})