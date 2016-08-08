(function () {
    'use strict';

    var baseUrl = 'http://letsshangout.herokuapp.com';

    angular
        .module('lets-hangout.services', [])
        .factory('Categories', Categories)

    Categories.$inject = ['$http'];

    function Categories($http){
    	var getAll = function(){
			return $http({
				method: 'GET',
				url: baseUrl + '/api/categories'
			})
			.then(function(resp){
				return resp.data;
			});
		};
	
		return {
			getAll: getAll
		};

    };


} ());

.factory('Group',function ($http,$window){
  var newGroup = function (groupName){
    return $http({
      method:'POST',
      url:'/api/group/user/:id',
      data:{
         groupName:groupName
      }
     })
     .then(function(resp){
      return resp;
     });
  }
  return {
    newGroup:newGroup
  }
})


