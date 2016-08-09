angular.module('lets-hangout.dashboards', [])

.controller('dashboardsController', function($scope,Group) {
  // dashboards Information in one group
    $scope.data=[];
    var arrayOfDash= Group.getdash();
    console.log(arrayOfDash);
   for (var i=0;i<arrayOfDash.length;i++){
    Group.dashboardInfo(arrayOfDash[i])
    .then(function (dashboard){
      console.log(dashboard);
      $scope.data.push(dashboard);

    })
    .catch(function (err){
      console.log(err);
    })

   }
    

  

  


})
