var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var SubCategory = require('../../subCategories/subCategoryModel.js');
var mongoose = require('mongoose');
var Categories = require('../../categories/categoryModel.js');

var postSubCategory = function(body, expectations) {
	chai.request(app)
    .post('/api/subCategory')
    .send(body)
    .end(expectations);
};

var getSubCategory = function(id, expectations) {
	chai.request(app)
    .get('/api/subCategory/' + id)
    .end(expectations);
};


var getChildren = function(id, expectations) {
	chai.request(app)
    .get('/api/subCategory/getChildren/' + id)
    .end(expectations);
};

var should = chai.should();

chai.use(chaiHttp);

describe('SubCategory Controller', function () {

	beforeEach(function (done) {
		mongoose.connection.db.dropDatabase(done);
	});

	it('should create new subCategory in database and responds with a 201 (Created)', function (done) {
		var testObj = {
			poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
			name: 'Suicide Squad',
			details: 'Action Movie',
			parentId: '57a33701864fd5bc095d5462'
		};
		postSubCategory(testObj,
			function(err, res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('poster');
				res.body.should.have.property('name');
				res.body.should.have.property('details');
				res.body.poster.should.equal(testObj.poster);
				res.body.name.should.equal(testObj.name);
				res.body.details.should.equal(testObj.details);
				done();
			});
	});

	it('should respond with 500 error when trying to create empty subCategory', function (done) {
		postSubCategory({},
			function(err, res) {
				res.should.have.status(500);
				done();
			});
	});

	it('should get information of a subCategory by id and responds with a 200', function (done) {  
		var newSubCategory = new SubCategory({
			poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
			name: 'Suicide Squad',
			details: 'Action Movie',
			parentId: '57a33701864fd5bc095d5462'
		});
		newSubCategory.save(function(err, data) {
			getSubCategory(data._id,
				function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('poster');
					res.body.should.have.property('name');
					res.body.should.have.property('details');
					res.body.poster.should.equal(data.poster);
					res.body.name.should.equal(data.name);
					res.body.details.should.equal(data.details);
					done();
				});
		});
	});

	it('should respond with an 500 error when trying to get non-existence subCategory', function (done) {  
		getSubCategory(1,
			function(err, res) {
				res.should.have.status(500);
				done();
			});
	});


	it('should get children array of a subCategory by parentId and responds with a 200', function (done) {
		var newCategory = new Categories({
			poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
			name: 'movies'
		});
		newCategory.save(function(err, data) {
			var newSubCategory = new SubCategory({
				poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
				name: 'Suicide Squad',
				details: 'Action Movie',
				parentId: data._id
			});
			newSubCategory.save(function(err, subCategory) {
				getChildren(data._id,
					function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body[0].parentId.should.equal(data._id.toString());
						res.body.should.be.a('Array');
						done();
					});
			});
		});
	});

	it('should respond with an 500 error when trying to get children of non-existence subCategory', function (done) {  
		getChildren(1,
			function(err, res) {
				res.should.have.status(500);
				done();
			});
	});

	it('should get array of subCategories by array of ids and responds with a 200', function (done) {
		var subCategoriesArr = [
			{
				poster: 'poster1',
				name: 'name1',
				details: 'details1',
				parentId: '57b2cc21811b603c12c79018'
			},
			{
				poster: 'poster2',
				name: 'name2',
				details: 'details2',
				parentId: '57b2cc21811b603c12c79018'
			},
			{
				poster: 'poster3',
				name: 'name3',
				details: 'details3',
				parentId: '57b2cc21811b603c12c79018'
			}
		];
		SubCategory.create(subCategoriesArr, function(err, subCategories) {
			chai.request(app)
			.post('/api/subCategories')
			.send({ids: [subCategories[0]._id, subCategories[1]._id]})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.equal(subCategoriesArr.length - 1);
				done();
			});
		});
	});

});