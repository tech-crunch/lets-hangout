angular.module('lets-hangout', [
  'ionic',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ionic.contrib.ui.tinderCards2'
  ])

.run(function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();

  //This event gets triggered on URL change
  var refreshingToken = null;
  $rootScope.$on('$locationChangeStart', function () {
    var token = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        if (refreshToken) {
          if (refreshingToken === null) {
            refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
              store.set('token', idToken);
              auth.authenticate(store.get('profile'), idToken);
            }).finally(function () {
              refreshingToken = null;
            });
          }
          return refreshingToken;
        } else {
          $location.path('/login');
        }                          
      }
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  .state('cards', {
    url: '/cards',
    templateUrl: 'templates/cards.html'
  });

  // Initialized the Auth0 provider
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
