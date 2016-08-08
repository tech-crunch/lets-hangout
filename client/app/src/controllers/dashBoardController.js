'use strict';

/**
 * @ngdoc function
 * @name Client.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ApiService.js',

    function( $scope, ApiService )
    {
      $scope.createNewDashBoard = function() {
        ApiService.createNew()
       .then(function(response) {
              $scope.dashboard = response.data;
              // close pull to refresh loader
              $scope.$broadcast('scroll.refreshComplete');
          });
      };

    }
];

