(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('friendsController', friendsController)

  friendsController.$inject = ['$scope', '$state', '$timeout','$location','$ionicPopup','$stateParams','Group'];

  function friendsController($scope, $state, $timeout,$location,$ionicPopup,$stateParams, Group) {

    $scope.data = [];
    $scope.gfriends = [];

    var sgroup = $location.path().split('/');

    //view friends in user table (in futur facebook friends)
    var allFriends = function (){
        Group.getAllFriends()
        .then(function (users){
          $scope.users=users
        })
        .catch(function (err){
          console.log(err);
        })
    };
    allFriends();
    // add friend 
    $scope.addFriend = function (user){
      console.log(user)
      Group.addingFriend($stateParams.groupID,user)
        .then(function (data){
          // document.getElementById(user.username).style.visibility='hidden';

          console.log(data);
         
        })
        .catch(function (err){
          console.log(err);
        })

    };

  };

} ());
