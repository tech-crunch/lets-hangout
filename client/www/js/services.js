(function () {
	'use strict';

	var baseUrl = 'http://letsshangout.herokuapp.com';
	var localUrl = 'http://localhost:8000'; 

	angular
		.module('lets-hangout.services', [])
		.factory('Categories', Categories)
		.factory('Group', Group)
		.factory('DashBoard', DashBoard)
		.factory('SubCategory', SubCategory)
		.factory('Users', Users)
		.factory('Credentials', Credentials);

	// categories factory
	Categories.$inject = ['$http'];
	function Categories($http) {
		var getAll = function() {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/categories'
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		return {
			getAll: getAll
		};
	}

	// groups factory
	Group.$inject = ['$http'];
	function Group($http) {
		var newGroup = function (groupName, id) {
			return $http({
				method: 'POST',
				url: baseUrl + '/api/group/user/' + id,
				data: {
					groupName: groupName
				}
			})
			.then(function(resp) {
				return resp;
			});
		};

		var allGroups = function() {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/group'
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var groupInfo = function(groupName) {
			console.log(1);
			return $http({
				method: 'GET',
				url: baseUrl + '/api/' + groupName
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var dashboardInfo = function(id) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/dashboard/' + id
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		return {
			newGroup: newGroup,
			allGroups: allGroups,
			groupInfo: groupInfo,
			dashboardInfo: dashboardInfo 
		};
	}

	// DashBoard factory
	DashBoard.$inject = ['$http'];
	function DashBoard($http) {
		var createNew = function() {
			return $http({
				method: 'POST',
				url: baseUrl + '/api/dashboard'
			})
			.then(function(resp) {
				return resp;
			});
		};

		var getInfo = function(dashBoardID) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/dashboard/' + dashBoardID
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var addOption = function(dashBoardID, subCategoryID) {
			return $http({
				method: 'PUT',
				url: baseUrl + '/api/dashboard/addOption/' + dashBoardID,
				data: {
					subCategoryId: subCategoryID
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var eleminateOptions = function(dashBoardID, subCategoryID) {
			return $http({
				method: 'PUT',
				url: baseUrl + '/api/dashboard/eleminateOptions/' + dashBoardID,
				data: {
					subCategoryId: subCategoryID
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var voteForOption = function(dashBoardID, optionID) {
			return $http({
				method: 'PUT',
				url: baseUrl + '/api/dashboard/voteForOption/' + dashBoardID,
				data: {
					subCategoryId: optionID
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var getchosenOption = function(dachboardId) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/dashboard/chosenID/' + dachboardId
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		return {
			createNew: createNew,
			getInfo: getInfo,
			addOption: addOption,
			eleminateOptions: eleminateOptions,
			voteForOption: voteForOption,
			getchosenOption: getchosenOption
		};
	}

	// SubCategory factory
	SubCategory.$inject = ['$http'];	
	function SubCategory($http) {

		var getInfo = function(subCategoryID) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/subCategory/' + subCategoryID
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var getChildren = function (parentId) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/subCategory/getChildren/' + parentId
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		return {
			getInfo: getInfo,
			getChildren: getChildren
		};
	}

	// Users factory
	Users.$inject = ['$http'];	
	function Users($http) {

		var getAll = function() {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/users'
			})
			.then(function(resp) {
				return resp;
			});
		};

		var addOne = function (user) {
			return $http({
				method: 'POST',
				url: baseUrl + '/api/users',
				data: user
			})
			.then(function(resp) {
				return resp;
			});
		};

		var getFriends = function (userId) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/users/friends/' + userId
			})
			.then(function(resp) {
				return resp;
			});
		};

		var getOne = function (userId) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/users/' + userId
			})
			.then(function(resp) {
				return resp;
			});
		};

		var updateInfo = function (userData) {
			return $http({
				method: 'PUT',
				url: baseUrl + '/api/users/' + userData.userId,
				data: userData
			})
			.then(function(resp) {
				return resp;
			});
		};

		return {
			getAll: getAll,
			addOne: addOne,
			getFriends: getFriends,
			getOne: getOne,
			updateInfo: updateInfo
		};
	}

	// Credentials factory
	Credentials.$inject = ['$http'];
	function Credentials($http) {
		var getCredentials = function() {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/authCredentials'
			})
			.then(function(resp) {
				return resp;
			});
		};

		return {
			getCredentials: getCredentials
		};
	}
} ());

