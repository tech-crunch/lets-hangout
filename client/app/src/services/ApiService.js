angular.module('lets-hangout.services', [])

.factory('DashBoard', function ($http) {
  // var createNew = function() {
    return $http({
        url: 'http://letsshangout.herokuapp.com/api/dashboard',
        method: 'POST'
    })
    .success(function(data) {
        return data;
    })
    .error(function(error) {
        console.log('an error occured', error);
    });




    return {
        createNew : createNew
    };
})