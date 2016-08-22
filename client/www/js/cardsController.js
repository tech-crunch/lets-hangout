(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('CardsController', CardsController);

	CardsController.$inject = ['$scope', '$state', '$timeout', 'Categories', 'SubCategory',
	'DashBoard', '$stateParams', 'store', '$location', '$rootScope'];

	function CardsController($scope, $state, $timeout, Categories, SubCategory,
	DashBoard, $stateParams, store, $location, $rootScope) {
		
		$scope.cards = {};

		$scope.showRefresh = false;

		var userId = store.get('userProfile').userId;

		var dashboardId = $stateParams.dashboardId;

		$rootScope.$ionicGoBack = function() {
			$state.go('home');
		};

		$scope.initialize = function() {
			$scope.showRefresh = false;
			Categories.getAll()
			.then(function(categories) {
				$scope.cards = {
					master: Array.prototype.slice.call(categories, 0),
					active: Array.prototype.slice.call(categories, 0),
				};
				$scope.refreshCards();
			})
			.catch(function(error) {
				console.log(error);
			});
		};

		$scope.initialize();


		$scope.cardDestroyed = function(index) {
			$scope.cards.active.splice(index, 1);
		};

		$scope.addCard = function() {
			var newCard = cardTypes[0];
			$scope.cards.active.push(angular.extend({}, newCard));
		};

		$scope.refreshCards = function() {
			// Set $scope.cards to null so that directive reloads
			$scope.cards.active = null;
			$timeout(function() {
				$scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
			});
		};

		$scope.$on('removeCard', function(event, element, card) {
			$scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
		});

		$scope.cardSwipedLeft = function(index) {
			if ($scope.cards.active.length === 1) {
				$scope.showRefresh = true;
			}
		};
		
		$scope.cardSwipedRight = function(index) {
			SubCategory.getChildren($scope.cards.active[index]._id)
			.then(function (cards) {
				if (cards.length !== 0) {
					$scope.cards = {
						master: Array.prototype.slice.call(cards, 0),
						active: Array.prototype.slice.call(cards, 0),
					};
					$scope.refreshCards();
				} else {
					var masterLength = $scope.cards.master.length - 1;
					var activeLength = $scope.cards.active.length;
					var subCategoryId = $scope.cards.master[masterLength - activeLength]._id;
					DashBoard.addOption(dashboardId, subCategoryId, userId)
					.then(function(response) {
						$location.path('/dashBoard/' + response._id);
					})
					.catch(function(error) {
						console.log(error);
					});
				}
			});
		};
	}
} ());