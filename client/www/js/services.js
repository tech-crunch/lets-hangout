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
		.factory('Users', Users);

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
		var newGroup = function (groupName, userid) {
			return $http({
				method: 'POST',
				url: localUrl + '/api/groups',
				data: {
					groupName: groupName,
					userid: userid
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var allGroups = function() {
			return $http({
				method: 'GET',
				url: localUrl + '/api/groups'
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var groupInfo = function(id) {
			return $http({
				method: 'GET',
				url: localUrl + '/api/groups/' + id
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var deletingGroup = function (id) {	
			return $http({
				method: 'DELETE',
				url: localUrl + '/api/groups/' + id
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var dashboardInfo = function(id) {
			return $http({
				method: 'GET',
				url: localUrl + '/api/dashboard/' + id
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var addingFriend = function (id, userid) {	
			return $http({
				method: 'POST',
				url: localUrl + '/api/groups/addFriend/' + id,
				data: {
					userid: userid
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var getAllFriends = function() {
			return $http({
				method: 'GET',
				url: localUrl + '/api/user/friends'
			})
			.then(function(resp) {
				console.log(resp.data);
				return resp.data;
			});

		};

		var deletingFriend = function (id, userid) {	
			return $http({
				method: 'PUT',
				url: localUrl + '/api/groups/removeFriend/' + id,
				data: {
					userid: userid
				}
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		return {
			newGroup: newGroup,
			allGroups: allGroups,
			groupInfo: groupInfo,
			dashboardInfo: dashboardInfo,
			addingFriend: addingFriend,
			getAllFriends: getAllFriends,
			deletingFriend: deletingFriend,
			deletingGroup: deletingGroup
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
				url: localUrl + '/api/users'
			})
			.then(function(resp) {
				return resp;
			});
		};

		var addOne = function (user) {
			return $http({
				method: 'POST',
				url: localUrl + '/api/users',
				data: user
			})
			.then(function(resp) {
				return resp;
			});
		};

		var getFriends = function (userId) {
			return $http({
				method: 'GET',
				url: localUrl + '/api/users/friends/' + userId
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var getOne = function (userId) {
			return $http({
				method: 'GET',
				url: localUrl + '/api/users/' + userId
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var updateInfo = function (userData) {
			return $http({
				method: 'PUT',
				url: localUrl + '/api/users/' + userData.userId,
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
} ());

