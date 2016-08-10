(function () {
    'use strict';

    var baseUrl = 'http://letsshangout.herokuapp.com';

    angular
        .module('lets-hangout')
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