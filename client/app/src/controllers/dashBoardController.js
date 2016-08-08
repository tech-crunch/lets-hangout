angular.module('lets-hangout.dashBoard', [])

.controller('dashBoardController', function($scope, DashBoard ) {
 
  $scope.dash = {};
  $scope.createNewDashBoard = function() {
    DashBoard.createNew()
    .then( function (data){
      $scope.dash = data.options;
    })
  }
})