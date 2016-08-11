(function () {
  'use strict';

  angular
    .module('lets-hangout')
    .controller('CardsController', CardsController)

  CardsController.$inject = ['$scope', '$state', '$timeout', 'Categories'];

  function CardsController($scope, $state, $timeout, Categories) {
    $scope.cards = {};

    $scope.initialize = function(){
      Categories.getAll()
      .then(function(categories){
        //$scope.categories = categories;
        $scope.cards = {
          master: Array.prototype.slice.call(categories, 0),
          active: Array.prototype.slice.call(categories, 0),
        };
      })
      .catch(function(error){
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
    }

    $scope.refreshCards = function() {
      // Set $scope.cards to null so that directive reloads
      $scope.cards.active = null;
      $timeout(function() {
        $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
      });
    }

    $scope.$on('removeCard', function(event, element, card) {
      $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    });

    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
    };
    
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
    };
  }

} ());