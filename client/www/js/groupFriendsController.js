(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('groupFriendsController', groupFriendsController)

  groupFriendsController.$inject = ['$scope','$location','$stateParams','Group'];

  function groupFriendsController($scope,$location,$stateParams, Group) {

    
    // var sgroup=$location.path().split('/')
    $scope.gfriends = [];
    
    //show friends in group
    var groupFriends = function (){
       Group.groupInfo($stateParams.groupID)
      .then(function (group){
        for (var i=0;i<group.users.length;i++){
          Group.userInfo(group.users[i])
            .then(function (user){
            $scope.gfriends.push(user);
          })
        }
        if ($scope.gfriends.length===0){
          // $scope.showAlert();
          console.log("no ff")
        }
      })
      .catch(function (err){
         console.log(err);
      })
    }
  
   groupFriends();
  //delete friend from group
  $scope.deleteFriend = function (user){
    console.log(user)
      Group.deletingFriend($stateParams.groupID,user)
        .then(function (data){
          location.reload();
         
        })
        .catch(function (err){
          console.log(err);
        })

    };


    
  }

} ());
