'use strict';

describe('Services', function () {
	var baseUrl = 'https://letsshangout.herokuapp.com';
	// Before each test load our lets-hangout.services module
	beforeEach(angular.mock.module('lets-hangout.services'));

	afterEach(inject(function ($httpBackend) {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));

	describe('Categories factory', function() {
		var $httpBackend, Categories;

		// Before each test set our injected Categories factory (_Categories_) to our local Users variable
		beforeEach(inject(function(_$httpBackend_, _Categories_) {
			Categories = _Categories_;
			$httpBackend = _$httpBackend_;
		}));

		// A test to verify the Categories factory exists
		it('Categories factory should exist', function() {
			expect(Categories).toBeDefined();
		});
		
		describe('.getAll()', function() {
			// A test to verify the method getAll exists
			it('getAll should be exist', function() {
				expect(Categories.getAll).toBeDefined();
			});

			it('getAll should get categories data 200(SUCCESS)', function() {
				var mockResponse = [
					{
						'name': 'play',
						'poster': 'https://s-media-cache-ak0.pinimg.com/236x/4c/21/73/4c217333cba41f88a4d6e6bee91a3525.jpg',
					},
					{
						'name': 'Movies',
						'poster': 'https://thumbs.dreamstime.com/z/cinema-poster-design-template-popcorn-box-disposable-cup-beverages-straw-film-strip-clapper-board-ticket-detailed-44098150.jpg',
					}
				];

				$httpBackend.expect('GET', baseUrl + '/api/categories').respond(mockResponse);

				Categories.getAll().then(function (categories) {
					expect(categories).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});
	});

	describe('SubCategory factory', function() {
		var $httpBackend, SubCategory;

		// Before each test set our injected Categories factory (_Categories_) to our local Users variable
		beforeEach(inject(function(_$httpBackend_, _SubCategory_) {
			SubCategory = _SubCategory_;
			$httpBackend = _$httpBackend_;
		}));

		// A test to verify the Categories factory exists
		it('subCategories factory should exist', function() {
			expect(SubCategory).toBeDefined();
		});

		describe('.getInfo()', function() {
			// A test to verify the method getAll exists
			it('getChildren should be exist', function() {
				expect(SubCategory.getInfo).toBeDefined();
			});

			it('getInfo should get one category data', function() {
				var mockResponse = {
					'_id': '57ab0333c665971c0daea5a1',
					'name': 'play',
					'poster': 'https://s-media-cache-ak0.pinimg.com/236x/4c/21/73/4c217333cba41f88a4d6e6bee91a3525.jpg',
					'parentId': '57ab09d1c665971c0daea5a1'
				};

				$httpBackend.when('GET', baseUrl + '/api/subCategory/' + '57ab0333c665971c0daea5a1').respond(mockResponse);

				SubCategory.getInfo('57ab0333c665971c0daea5a1').then(function (subCategory) {
					expect(subCategory).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});
		
		describe('.getChildren()', function() {
			// A test to verify the method getAll exists
			it('getChildren should be exist', function() {
				expect(SubCategory.getChildren).toBeDefined();
			});

			it('getChildren should get categories data 200(SUCCESS)', function() {
				var mockResponse = [
					{
						'name': 'play',
						'poster': 'https://s-media-cache-ak0.pinimg.com/236x/4c/21/73/4c217333cba41f88a4d6e6bee91a3525.jpg',
						'parentId': '57ab09d1c665971c0daea5a1'
					},
					{
						'name': 'Movies',
						'poster': 'https://thumbs.dreamstime.com/z/cinema-poster-design-template-popcorn-box-disposable-cup-beverages-straw-film-strip-clapper-board-ticket-detailed-44098150.jpg',
						'parentId': '57ab09d1c665971c0daea5a1'
					}
				];

				$httpBackend.expect('GET', baseUrl + '/api/subCategory/getChildren/' + '57ab09d1c665971c0daea5a1').respond(mockResponse);

				SubCategory.getChildren('57ab09d1c665971c0daea5a1').then(function (SubCategories) {
					expect(SubCategories).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});
	});

	describe('Group factory', function () {
		var $httpBackend, Group;

		// Before each test set our injected Group factory (_group_) to our local Users variable
		beforeEach(inject(function(_$httpBackend_, _Group_) {
			Group = _Group_;
			$httpBackend = _$httpBackend_;
		}));

		it('Group factory should exist', function() {
			expect(Group).toBeDefined();
		});

		describe('.allGroups()', function() {
			it('allGroups should get Groups data 200(SUCCESS)', function() {

				var mockResponse = [
					{
						'groupName': 'group1',
						'groupAdmin': '22'
					},
					{
						'groupName': 'group2',
						'groupAdmin': '11'
					}
				];

				$httpBackend.expect('GET', baseUrl + '/api/group').respond(mockResponse);

				Group.allGroups().then(function (groups) {
					expect(groups).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});

		describe('.groupInfo()', function() {
			// A test to verify the method groupInfo exists
			it('groupInfo should be exist', function() {
				expect(Group.groupInfo).toBeDefined();
			});

			it('groupInfo should get Group data 200(SUCCESS)', function() {

				var mockResponse = [
					{
						'groupName': 'group1',
						'groupAdmin': '22'
					}
					
				];

				$httpBackend.expect('GET', baseUrl + '/api/' + mockResponse.groupName).respond(mockResponse);

				Group.groupInfo().then(function (groups) {
					expect(groups).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});

		describe('.dashboardInfo()', function() {
			// A test to verify the method dashboardInfo exists
			it('dashboardInfo should be exist', function() {
				expect(Group.dashboardInfo).toBeDefined();
			});

			it('dashboardInfo should get Group data 200(SUCCESS)', function() {

				var mockResponse = [
					{
						'_id': '4743580489'
					}
					
				];

				$httpBackend.expect('GET', baseUrl + '/api/dashboard/' + mockResponse ._id).respond(mockResponse);

				Group.dashboardInfo().then(function (groups) {
					expect(groups).toEqual(mockResponse);
				});
				$httpBackend.flush();
			});
		});

		describe('.newGroup()', function() {
			// A test to verify the method newGroup exists
			it('newGroup should be exist', function() {
				expect(Group.newGroup).toBeDefined();
			});
		});
	});


	describe('DashBoard factory', function () {
		var $httpBackend, DashBoard;

		// Before each test set our injected Categories factory (_Categories_) to our local Users variable
		beforeEach(inject(function(_$httpBackend_, _DashBoard_) {
			DashBoard = _DashBoard_;
			$httpBackend = _$httpBackend_;
		}));
		var newDash = {
			_id: '57ab0d66c665971c0daea5a4',
			date: '2016-08-10 11:17:58.339Z',
			options: [],
			chosenOption: '57ab0d66c555971c0daea5a4'
		};

		it('DashBoard factory should exist', function() {
			expect(DashBoard).toBeDefined();
		});
		describe('.createNew()', function() {
			it('should add a new dachboard with `createNew`', function () {
				$httpBackend
					.when('POST', baseUrl + '/api/dashboard' )
					.respond(201, {options: ['57ab09d1c665971c0daea5a1']});
				DashBoard.createNew().then(function (resp) {
					expect(resp.status).toEqual(201);
					expect(resp.data.options).toContain('57ab09d1c665971c0daea5a1');
				});
				$httpBackend.flush();
			});
		});
			
		describe('.getInfo()', function() {

			it('getInfo should be exist', function() {
				expect(DashBoard.getInfo).toBeDefined();
			});

			it('getInfo should get dashboard data with a given id 200(SUCCESS)', function() {
				
				$httpBackend
						.expect('GET', baseUrl + '/api/dashboard/57ab0d66c665971c0daea5a4')
						.respond (newDash);
				DashBoard.getInfo('57ab0d66c665971c0daea5a4').then(function (data) {
					expect(data._id).toEqual(newDash._id);
				}); 
				$httpBackend.flush();
			});
		});

		describe('.addOption()', function() {

			it('addOption should be exist', function() {
				expect(DashBoard.addOption).toBeDefined();
			});

			it('addOption should add new option to dashboard with a given id 200(SUCCESS)', function() {
				$httpBackend
						.when('PUT', baseUrl + '/api/dashboard/addOption/' + newDash._id)
						.respond (newDash);
				DashBoard.addOption(newDash._id, '57ab09d1c665971c0daea5a1')
				.then(function (data) {
					expect(data._id).toEqual(newDash._id);
				});
				$httpBackend.flush();
			});
		});

		describe('.eleminateOptions()', function() {

			it('eleminateOptions should be exist', function() {
				expect(DashBoard.eleminateOptions).toBeDefined();
			});

			it('eleminateOptions should eleminate option from dashboard with a given id 200(SUCCESS)', function() {
				$httpBackend
						.when('PUT', baseUrl + '/api/dashboard/eleminateOptions/' + newDash._id)
						.respond (newDash);
				DashBoard.eleminateOptions(newDash._id, '57ab09d1c665971c0daea5a1')
				.then(function (data) {
					expect(data._id).toEqual(newDash._id);
				});
				$httpBackend.flush();
			});
		});

		describe('.voteForOption()', function() {
			it('voteForOption should be exist', function() {
				expect(DashBoard.voteForOption).toBeDefined();
			});

			it('voteForOption should increase voting proparety for a given subCategoryId 200(SUCCESS)', function() {
				$httpBackend
						.when('PUT', baseUrl + '/api/dashboard/voteForOption/' + newDash._id)
						.respond (newDash);
				DashBoard.voteForOption(newDash._id, '57ab09d1c665971c0daea5a1')
				.then(function (data) {
					expect(data._id).toEqual(newDash._id);
				});
				$httpBackend.flush();
			});
		}); 

		describe('.getchosenOption()', function() {
			it('getchosenOption should be exist', function() {
				expect(DashBoard.getchosenOption).toBeDefined();
			});

			it('getchosenOption should get option info with the most voting proparety 200(SUCCESS)', function() {
				$httpBackend
						.when('GET', baseUrl + '/api/dashboard/chosenID/' + newDash._id)
						.respond (newDash.chosenOption);
				DashBoard.getchosenOption(newDash._id)
				.then(function (data) {
					expect(data).toEqual(newDash.chosenOption);
				});
				$httpBackend.flush();
			});
		}); 
	});

	describe('Users factory', function () {
		var $httpBackend, Users;

		var newUser = {
			userId: '12345',
			picture: 'testPicture',
			friends: [],
			name: 'testName'
		};

		beforeEach(inject(function(_$httpBackend_, _Users_) {
			Users = _Users_;
			$httpBackend = _$httpBackend_;
		}));

		it('Users factory should exist', function() {
			expect(Users).toBeDefined();
		});

		describe('.addOne()', function() {
			it('should add a new user with `addOne`', function () {
				$httpBackend
					.when('POST', baseUrl + '/api/users' )
					.respond(201, newUser);
				Users.addOne(newUser).then(function (resp) {
					expect(resp.status).toEqual(201);
					expect(resp.data.userId).toEqual('12345');
				});
				$httpBackend.flush();
			});
		});

		describe('.getAll()', function() {

			it('getAll should be exist', function() {
				expect(Users.getAll).toBeDefined();
			});

			it('getAll should get Users data with 200(SUCCESS)', function() {
				
				$httpBackend
						.expect('GET', baseUrl + '/api/users')
						.respond ();
				Users.getAll().then(function (resp) {
					expect(resp.status).toEqual(200);
				}); 
				$httpBackend.flush();
			});
		});

		describe('.getFriends()', function() {

			it('getFriends should be exist', function() {
				expect(Users.getFriends).toBeDefined();
			});

			it('getFriends should get a user friends with a given id 200(SUCCESS)', function() {
				$httpBackend
						.when('GET', baseUrl + '/api/users/friends/' + newUser.userId)
						.respond ();
				Users.getFriends(newUser.userId)
				.then(function (resp) {
					expect(resp.status).toEqual(200);
				});
				$httpBackend.flush();
			});
		});

		describe('.getOne()', function() {

			it('getOne should be exist', function() {
				expect(Users.getOne).toBeDefined();
			});

			it('getOne should get a users info with a given id 200(SUCCESS)', function() {
				$httpBackend
						.when('GET', baseUrl + '/api/users/' + newUser.userId)
						.respond ();
				Users.getOne(newUser.userId)
				.then(function (resp) {
					expect(resp.status).toEqual(200);
				});
				$httpBackend.flush();
			});
		});

		describe('.updateInfo()', function() {

			it('updateInfo should be exist', function() {
				expect(Users.updateInfo).toBeDefined();
			});

			it('updateInfo should update users info with a given id 201(SUCCESS)', function() {
				$httpBackend
					.when('PUT', baseUrl + '/api/users/' + newUser.userId)
					.respond ();
				Users.updateInfo({userId: newUser.userId})
				.then(function (resp) {
					expect(resp.status).toEqual(200);
				});
				$httpBackend.flush();
			});
		});
	});

	describe('Credentials factory', function () {
		var $httpBackend, Credentials;

		var newUser = {
			userId: '12345',
			picture: 'testPicture',
			friends: [],
			name: 'testName'
		};

		beforeEach(inject(function(_$httpBackend_, _Credentials_) {
			Credentials = _Credentials_;
			$httpBackend = _$httpBackend_;
		}));

		it('Credentials factory should exist', function() {
			expect(Credentials).toBeDefined();
		});

		describe('.getCredentials()', function() {
			it('should get auth credentials with `getCredentials`', function () {
				$httpBackend
					.when('GET', baseUrl + '/api/authCredentials' )
					.respond(200, {
						AUTH0_CLIENT_ID: '1234',
						AUTH0_DOMAIN: '5678'
					});
				Credentials.getCredentials().then(function (resp) {
					expect(resp.status).toEqual(200);
					expect(resp.data['AUTH0_CLIENT_ID']).toEqual('1234');
				});
				$httpBackend.flush();
			});
		});
	});
});