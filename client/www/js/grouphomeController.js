(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('grouphomeController', grouphomeController)

  grouphomeController.$inject = ['$scope', '$state', '$timeout','$location', 'Group'];

  function grouphomeController($scope, $state, $timeout,$location, Group) {

    // dashboards Information in one group
    $scope.data=[];

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
  };

} ());
