(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('groupFriendsController', groupFriendsController)

  groupFriendsController.$inject = ['$scope','$location', 'Group'];

  function groupFriendsController($scope,$location, Group) {

    
    var sgroup=$location.path().split('/')
    $scope.gfriends = [];
    
    //show friends in group
    var groupFriends = function (){
       Group.groupInfo(sgroup[2])
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
      Group.deletingFriend(sgroup[2],user)
        .then(function (data){
          location.reload();
         
        })
        .catch(function (err){
          console.log(err);
        })

    };


    
  }

} ());
