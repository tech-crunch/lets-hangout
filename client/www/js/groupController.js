(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('groupController', groupController);
	
	groupController.$inject = ['$scope', '$location', 'Group'];

	function groupController($scope, $location, Group) {

		$scope.group = {};
		$scope.data = [];

		var id1 = '57a9956eb5cc56040914fc1c';
		var id2 = '57a996e6dcba0f714010db80';
		
		// group Information
		var init = function () {
			Group.allGroups()
			.then(function (groups) {
				$scope.data.groups = groups;
				console.log($scope.data.groups);
			})
			.catch(function (err) {
				console.log(err);
			});
		};

		init();

		// create new Group
		$scope.createGroup = function () {
			Group.newGroup($scope.group.groupName, id1)
			.then(function (data) {
				console.log(data);
				init();
			})
			.catch(function (err) {
				console.log(err);
			});
		};

		// select group
		$scope.selectGroup = function(name) {
			$location.path('/group/' + name);
		};
	}
} ());
