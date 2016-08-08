angular.module('lets-hangout.services', [])

.factory('Categories', function($http){
	var baseUrl = 'http://letsshangout.herokuapp.com';

	var getAll = function(){
		return $http({
			method: 'GET',
			url: baseUrl + '/api/categories'
		})
		.then(function(resp){
			return resp.data;
		});
	};
	
	var addOne = function(category){
		return $http({
			method: 'POST',
			url: baseUrl + '/api/categories',
			data: category
		})
		.then(function(resp){
			return resp;
		});
	};

	return {
		getAll: getAll,
		addOne: addOne
	};
});