(function () {
	'use strict';

	angular
		.module('lets-hangout')
		.controller('LoginController', LoginController);
	
	LoginController.$inject = ['$scope', '$state', 'auth', 'store', 'Users'];

	function LoginController($scope, $state, auth, store, Users) {
		var vm = this;

		var doLogin = function() {
			if (store.get('userProfile')) {
				$state.go('home');
				return;
			}

			auth.signin({
				authParams: {
					scope: 'openid offline_access',
					device: 'Mobile device'
				}
			}, function (profile, token, accessToken, state, refreshToken) {
				// Success callback
				store.set('profile', profile);
				store.set('token', token);
				store.set('accessToken', accessToken);
				store.set('refreshToken', refreshToken);

				// getting userID
				var userID;
				for (var i = 0; i < profile.identities.length; i++) {
					if (profile.identities[i].provider === 'facebook') {
						userID = profile.identities[i].user_id;
						break;
					}
				}

				// getting facebook friends that use the same app
				var friends = [];
				var facebookFriends = profile.context.mutual_friends.data;
				for (var i = 0; i < facebookFriends.length; i++) {
					friends.push(facebookFriends[i].id);
				}
				
				var userObj = {
					userId: userID || profile.user_id.slice(9),
					name: profile.name,
					picture: profile.picture,
					friends: friends
				};

				Users.getOne(store.get('profile').user_id.slice(9))
				.then(function(resp) {
					// update info
					Users.updateInfo(userObj)
					.then(function(result) {
						store.set('userProfile', result.data);
						$state.go('home');
					})
					.catch(function(error) {
						console.log(error);
					});
				})
				.catch(function(error) {
					// create new User
					Users.addOne(userObj)
					.then(function(result) {
						store.set('userProfile', result.data);
						$state.go('home');
					})
					.catch(function(error) {
						console.log(error);
					});
				});
				
			}, function (error) {
				console.log(error);
			});
		};

		doLogin();
	}
} ());