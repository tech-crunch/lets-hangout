(function () {
    'use strict';

    var baseUrl = 'http://letsshangout.herokuapp.com';
    var localUrl = 'http://localhost:8000'; 

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

.factory('Group',function ($http){
	// var newDash;
  var newGroup = function (groupName,id){
    return $http({
      method:'POST',
      url: localUrl+'/api/group/user/'+id,
      data:{
         groupName:groupName
      }
     })
     .then(function(resp){
      	return resp;
     });
  };

  var allGroups = function(){
  	return $http({
  		method: 'GET',
  		url: localUrl+'/api/group'
  	})
  	.then(function(resp){
  		return resp.data;
  	})
  };

  var groupInfo = function(groupName){
    console.log(1);
  	return $http({
  		method: 'GET',
  		url: localUrl+'/api/'+groupName
  	})
  	.then(function(resp){
  		return resp.data;
  	})

  };
   var dashboardInfo = function(id){
  	return $http({
  		method: 'GET',
  		url: localUrl+'/api/dashboard/'+id
  	})
  	.then(function(resp){
  		return resp.data;
  	})

  };

  var addFriend = function (groupName,username){
    return $http({
      method:'POST',
      url: localUrl+'/api/group/'+groupName,
      data:{
         username:username
      }
     })
     .then(function(resp){
        return resp;
     });
  };

  var getAllFriends = function(){
    return $http({
      method: 'GET',
      url: localUrl+'/api/users'
    })
    .then(function(resp){
      return resp.data;
    })

  };



  return {
    newGroup:newGroup,
    allGroups:allGroups,
    groupInfo:groupInfo,
    dashboardInfo:dashboardInfo,
    addFriend:addFriend,
    getAllFriends:getAllFriends
    
  }

})


