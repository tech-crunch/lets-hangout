(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('grouphomeController', grouphomeController)

  grouphomeController.$inject = ['$scope', '$state', '$timeout','$location','$ionicActionSheet','Group', '$stateParams'];

  function grouphomeController($scope, $state, $timeout,$location,$ionicActionSheet, Group, $stateParams) {

    // dashboards Information in one group
    $scope.data = [];
    $scope.gfriends = [];

    // var sgroup = $location.path().split('/');

    var init = function (){
      Group.groupInfo($stateParams.groupID)
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
  /////
   $scope.showActionsheet = function() {
    
    $ionicActionSheet.show({
      titleText: 'Group Settings',
      buttons: [
        { text: 'Show Members' },
        { text: 'Add Friend' },
      ],
      destructiveText: 'Delete Group',
      cancelText: 'Cancel',

      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        if(index === 1) {
         $location.path('/groups/friends/'+$stateParams.groupID)
            }
        
        if(index === 0) {
          //move to  groupFriends Page to delete
          $location.path('/groups/members/'+$stateParams.groupID)
            }

      },
      destructiveButtonClicked: function() {
        // delete group
        Group.deletingGroup($stateParams.groupID)
       .then(function (data){
        $location.path('/groups')
       })
      }
    });
  };

   // delete group
    // $scope.deleteGroup = function (){
    //   Group.deletingGroup(sgroup[2])
    //    .then(function (data){
    //     $location.path('/group/user')
    //    })
    // }
  
    
    // $scope.facebookFriend = function (){
    //   $location.path('/group/friends/'+sgroup[2])
    //     };


    // //move to  groupFriends Page to delete 
    // $scope.friends = function (){
    //   $location.path('/group/'+sgroup[2]+'/groupFriends')
    //     };

  };

} ());
