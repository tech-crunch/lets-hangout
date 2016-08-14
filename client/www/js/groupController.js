(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('groupController', groupController);

	groupController.$inject = ['$scope', '$location', 'Group', 'store'];

	function groupController($scope, $location, Group, store) {

		$scope.group = {};
		$scope.data = [];
		// groups Information
		var init = function () {
			Group.allGroups()
			.then(function (groups) {
				$scope.data.groups = groups;
			})
			.catch(function (err) {
				console.log(err);
			});
		};

		init();

		// create new Group
		$scope.createGroup = function () {
			console.log(store.get('userProfile'));
			Group.newGroup($scope.group.groupName, store.get('userProfile').userId)
			.then(function (data) {
				init();
			})
			.catch(function (err) {
				console.log(err);
			});
		};

		// select group
		$scope.selectGroup = function(name) {
			$location.path('/groups/' + name);
		};

	}

} ());
