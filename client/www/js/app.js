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
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html'
	})
	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
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
			}
		}
	})      
	.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html'
			}
		}
	})
	.state('app.cards', {
		url: '/cards/:dashboardId',
		views: {
			'menuContent': {
				templateUrl: 'templates/cards.html'
			}
		}
	})
	.state('app.dash', {
		url: '/dash',
		views: {
			'menuContent': {
				templateUrl: 'templates/dash.html'
			}
		}
	})  
	.state('app.dashBoard', {
		url: '/dashBoard/:id',
		views: {
			'menuContent': {
				templateUrl: 'templates/dashboard.html',
			}
		}
	})
	.state('app.grouphome', {
		url: '/groups/:groupID',
		views: {
			'menuContent': {
				templateUrl: 'templates/groupHome.html',
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
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
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, auth, store) {

	// Form data for the login modal
	$scope.loginData = {};
	$scope.isExpanded = false;

	var navIcons = document.getElementsByClassName('ion-navicon');
	for (var i = 0; i < navIcons.length; i++) {
		navIcons.addEventListener('click', function() {
			this.classList.toggle('active');
		});
	}

	$scope.logout = function() {
		auth.signout();
		store.remove('profile');
		store.remove('token');
		store.remove('accessToken');
		store.remove('refreshToken');
		store.remove('userProfile');
	};

	// Layout Methods

	$scope.hideNavBar = function() {
		document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
	};

	$scope.showNavBar = function() {
		document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
	};

	$scope.noHeader = function() {
		var content = document.getElementsByTagName('ion-content');
		for (var i = 0; i < content.length; i++) {
			if (content[i].classList.contains('has-header')) {
				content[i].classList.toggle('has-header');
			}
		}
	};

	$scope.setExpanded = function(bool) {
		$scope.isExpanded = bool;
	};

	$scope.hasHeader = function() {
		var content = document.getElementsByTagName('ion-content');
		for (var i = 0; i < content.length; i++) {
			if (!content[i].classList.contains('has-header')) {
				content[i].classList.toggle('has-header');
			}
		}
	};

	$scope.hideHeader = function() {
		$scope.hideNavBar();
		$scope.noHeader();
	};

	$scope.showHeader = function() {
		$scope.showNavBar();
		$scope.hasHeader();
	};
});
