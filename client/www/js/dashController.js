(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('dashController', dashController);

	dashController.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'ionicMaterialInk', 'ionicMaterialMotion', 'Categories', 'SubCategory'];

	function dashController($scope, $state, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion, Categories, SubCategory) {

		 // Set Header
		$scope.$parent.showHeader();
		$scope.isExpanded = false;
		$scope.$parent.setExpanded(false);

		// Set Motion
		$timeout(function() {
			ionicMaterialMotion.slideUp({
				selector: '.slide-up'
			});
		}, 300);

		// Set Ink
		ionicMaterialInk.displayEffect();
			
		Categories.getAll()
		.then(function(categories) {
			console.log(categories);
			SubCategory.getChildren(categories[0]._id)
			.then(function (options) {
				$scope.options = options;
				console.log(options);
			});
		})
		.catch(function(error) {
			console.log(error);
		});
		
			
		

	}
} ());