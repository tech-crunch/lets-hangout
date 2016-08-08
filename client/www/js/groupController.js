angular.module('lets-hangout.group', [])

.controller('groupController', function($scope,Group) {
  $scope.data="hi";

  $scope.createGroup = function (){
  	Group.newGroup($scope.group)
  	.then(function (data){
  		console.log(data);
  	})
  	.catch(function (err){
  		console.log(err);
  	})
  }

})
