angular.module('lets-hangout.cards', [])

.controller('CardsCtrl', function($scope, $timeout, Categories) {

  $scope.cards = {};

  $scope.initialize = function(){
    Categories.getAll()
    .then(function(categories){
      //$scope.categories = categories;
      $scope.cards = {
        master: Array.prototype.slice.call(categories, 0),
        active: Array.prototype.slice.call(categories, 0),
        discards: [],
        liked: [],
        disliked: []
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
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
  };

})

.controller('CardCtrl', function($scope, TDCardDelegate) {

});
