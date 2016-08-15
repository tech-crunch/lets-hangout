(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('dashController', dashController);

	dashController.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'ionicMaterialInk', 'ionicMaterialMotion', 'Categories', 'SubCategory'];

	function dashController($scope, $state, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion, Categories, SubCategory) {
		// Activate ink for controller
		ionicMaterialInk.displayEffect();
		ionicMaterialMotion.pushDown({
			selector: '.push-down'
		});
    // ionicMaterialMotion.fadeSlideInRight({
    //     selector: '.animate-fade-slide-in .item'
    // });
			
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