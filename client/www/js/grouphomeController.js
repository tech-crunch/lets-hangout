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

  
    //view friends in user table (in futur facebook friends)
    $scope.allFriends = function (){
        Group.getAllFriends()
        .then(function (users){
          $scope.users=users
        })
        .catch(function (err){
          console.log(err);
        })
    };
    // add friend 
    $scope.addFriend = function (user){
      Group.addingFriend(sgroup[2],user)
        .then(function (data){
          console.log(data);
         
        })
        .catch(function (err){
          console.log(err);
        })

    };

    //move to  groupFriends Page to delete 
    $scope.friends = function (){
      $location.path('/group/'+sgroup[2]+'/friends')
        }

    // //delete friend
    // $scope.deleteFriend = function (user){
    //   Group.deletingFriend(sgroup[2],user)
    //     .then(function (data){
    //       console.log(data);
         
    //     })
    //     .catch(function (err){
    //       console.log(err);
    //     })

    // };
    // //show friends in group
    // $scope.groupFriends = function (){
    //    Group.groupInfo(sgroup[2])
    //   .then(function (group){
    //     for (var i=0;i<group.users.length;i++){
    //       Group.userInfo(group.users[i])
    //         .then(function (user){
    //           console.log(user)
    //         $scope.gfriends.push(user);
    //       })
    //     }
    //     if ($scope.gfriends.length===0){
    //       console.log($scope.gfriends)
    //       console.log($scope.gfriends.length)
    //       // $scope.showAlert();
    //       console.log("no ff")
    //     }
    //   })
    //   .catch(function (err){
    //      console.log(err);
    //   })
    // }



  };

} ());
