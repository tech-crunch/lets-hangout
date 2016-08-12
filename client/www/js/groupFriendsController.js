(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('groupFriendsController', groupFriendsController)

  groupFriendsController.$inject = ['$scope','$location', 'Group'];

  function groupFriendsController($scope,$location, Group) {
    //delete friend
    console.log($location.path().split('/'))
    $scope.deleteFriend = function (user){
      Group.deletingFriend(sgroup[3],user)
        .then(function (data){
          console.log(data);
         
        })
        .catch(function (err){
          console.log(err);
        })

    };
    //show friends in group
    $scope.groupFriends = function (){
       Group.groupInfo(sgroup[3])
      .then(function (group){
        for (var i=0;i<group.users.length;i++){
          Group.userInfo(group.users[i])
            .then(function (user){
              console.log(user)
            $scope.gfriends.push(user);
          })
        }
        if ($scope.gfriends.length===0){
          console.log($scope.gfriends)
          console.log($scope.gfriends.length)
          // $scope.showAlert();
          console.log("no ff")
        }
      })
      .catch(function (err){
         console.log(err);
      })
    }



    
  }

} ());
