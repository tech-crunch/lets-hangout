(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('grouphomeController', grouphomeController)

  grouphomeController.$inject = ['$scope', '$state', '$timeout','$location','$ionicPopup','Group'];

  function grouphomeController($scope, $state, $timeout,$location,$ionicPopup, Group) {

    // dashboards Information in one group
    $scope.data = [];
    $scope.gfriends = [];

    var sgroup = $location.path().split('/');

    var init = function (){
      Group.groupInfo(sgroup[2])
      .then(function (group){
        for (var i=0;i<group.dashboard.length;i++){
          Group.dashboardInfo(group.dashboard[i])
            .then(function (dashboard){
            $scope.data.push(dashboard);
          })
        }
      })
      .catch(function (err){
         console.log(err);
      })
    };   

    init();
    $scope.showAlert = function() {
  
      var alertPopup = $ionicPopup.alert({
         title: 'Delete Friend',
         template: 'No Friends in your group to delete'
      });
    }
    // delete group
    $scope.deleteGroup = function (){
      Group.deletingGroup(sgroup[2])
        $location.path('/group/user')
    }
  
    
    $scope.facebookFriend = function (){
      $location.path('/group/friends/'+sgroup[2])
        };


    //move to  groupFriends Page to delete 
    $scope.friends = function (){
      $location.path('/group/'+sgroup[2]+'/groupFriends')
        };

  };

} ());
