angular.module('lets-hangout', [
	'ionic',
	'auth0',
	'angular-storage',
	'angular-jwt',
	'ionic.contrib.ui.tinderCards2',
	'ionic-material',
	'lets-hangout.services',
	'ionMdInput',
	'ionic-datepicker'
	

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
		if (token && jwtHelper.isTokenExpired(token)) {
			store.remove('profile');
			store.remove('token');
			store.remove('accessToken');
			store.remove('refreshToken');
			store.remove('userProfile');
		}
	});
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
	var AUTH0_CALLBACK_URL = location.href;

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	var notInitializedFlag = true;
	
	
	$ionicConfigProvider.views.maxCache(0);

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'templates/home.html',
		resolve: {
			data: function($state, store, Credentials) {
				if (notInitializedFlag) {
					store.remove('Initialized');
					Credentials.getCredentials()
					.then(function(resp) {
						// Initialized the Auth0 provider
						authProvider.init({
							clientID: resp.data.AUTH0_CLIENT_ID,
							domain: resp.data.AUTH0_DOMAIN,
							loginState: 'app.login'
						});
						store.set('Initialized', true);
					});
				}
			}
		}
	})      
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html'
	})
	.state('cards', {
		url: '/cards/:dashboardId',
		templateUrl: 'templates/cards.html'
	}) 
	.state('dashBoard', {
		url: '/dashBoard/:id',
		templateUrl: 'templates/dashboard.html',
	})
	.state('messages', {
		url: '/messages/:id',
		templateUrl: 'templates/messages.html'
	})
	.state('grouphome', {
		url: '/groups/:groupID',
		templateUrl: 'templates/groupHome.html',
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/home');
})
.directive('noScroll', function($document) {

	return {
		restrict: 'A',
		link: function($scope, $element, $attr) {

			$document.on('touchmove', function(e) {
				e.preventDefault();
			});
		}
	};
})
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, auth, store, $location) {

	$scope.loggedIn = store.get('userProfile') ? true : false;

	$scope.logout = function() {
		auth.signout();
		store.remove('profile');
		store.remove('token');
		store.remove('accessToken');
		store.remove('refreshToken');
		store.remove('userProfile');
	};

	$scope.goHome = function() {
		$location.path('/');
	};
});
