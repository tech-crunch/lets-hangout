angular.module('lets-hangout.dashboards', [])

.controller('dashboardsController', function($scope,Group,$location) {
  // dashboards Information in one group
    $scope.data=[];
    var sgroup = $location.path().split('/');
    console.log(sgroup)
    var init = function (){
    console.log(sgroup[2])
    Group.groupInfo(sgroup[2])
    .then(function (group){
      for (var i=0;i<group.dashboard.length;i++){
    Group.dashboardInfo(group.dashboard[i])
    .then(function (dashboard){
      console.log(dashboard);
      $scope.data.push(dashboard);

    })


    }
  })
    .catch(function (err){
      console.log(err);
    })
  }

  init();

//view friends ///for trying 
$scope.allFriends = function (){
    Group.getAllFriends()
    .then(function (data){
      console.log(data);
    })
    .catch(function (err){
      console.log(err);
    })
}


   
  

})
