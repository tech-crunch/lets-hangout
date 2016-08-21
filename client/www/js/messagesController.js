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
				count: 200, // 100 is the default
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
				message: {'text': messageBox, 'userName': $scope.user.name, 'userPic': $scope.user.picture},
				callback: function(m) {
					document.getElementById('msgBox').value = '';
					$timeout(function() {
						viewScroll.scrollBottom(true);
					}, 0);
				}
			});
		};
	}
} ());