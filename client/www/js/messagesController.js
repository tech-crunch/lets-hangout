(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('messagesController', messagesController);

	messagesController.$inject = ['$scope', '$state', '$timeout', '$location', '$stateParams', 'store', '$ionicScrollDelegate'];

	function messagesController($scope, $state, $timeout, $location, $stateParams, store, $ionicScrollDelegate) {
		
		var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');

		$scope.dashboardId = $stateParams.id; 

		$scope.user = store.get('userProfile');

		$scope.init = function () {
			pubnub.history({
				channel: $scope.dashboardId,
				callback: function(m) {
					$scope.messages = m[0];
					$timeout(function() {
						viewScroll.scrollBottom(true);
					}, 0);
				},
				count: 10, // 100 is the default
				reverse: false // false is the default
			});
		};
		$scope.init();

		pubnub.subscribe({
			channel: $scope.dashboardId,
			message: function(m) {
				$scope.messages.push(m);
				$timeout(function() {
					viewScroll.scrollBottom(true);
				}, 0);
			},
			error: function (error) {
				// Handle error here
				console.log(JSON.stringify(error));
			}
		});

		$scope.sendMessage = function (messageBox) {
			pubnub.publish({
				channel: $scope.dashboardId,
				message: {'text': $scope.messageBox, 'name': $scope.user.name},
				callback: function(m) {
					$scope.messageBox = '';
					$timeout(function() {
						viewScroll.scrollBottom(true);
					}, 0);
				}
			});
		};
	}
} ());