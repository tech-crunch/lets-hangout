var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');
var SubCategory = require('../../subCategories/subCategoryModel.js');
var mongoose = require('mongoose');

var postSubCategory = function(body, expectations){
  chai.request(app)
    .post('/api/subCategory')
    .send(body)
    .end(expectations);
};

var getSubCategory = function(id, expectations){
  chai.request(app)
    .get('/api/subCategory/'+id)
    .end(expectations);
};

var addChildToSub = function(body, id, expectations){
  chai.request(app)
    .put('/api/subCategory/'+id)
    .send(body)
    .end(expectations);
};

var getChildren = function(id, expectations){
  chai.request(app)
    .get('/api/subCategory/getChildren/'+id)
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
      details: 'Action Movie'
    };
    postSubCategory(testObj,
      function(err, res){
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
      function(err, res){
        res.should.have.status(500);
        done();
    });
  });

  it('should get information of a subCategory by id and responds with a 200', function (done) {  
    var newSubCategory = new SubCategory({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie'
    });
    newSubCategory.save(function(err, data) {
      getSubCategory(data._id,
        function(err, res){
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
      function(err, res){
        res.should.have.status(500);
        done();
    });
  });

  it('should create add child to subCategory in database and responds with a 201', function (done) {
    var testArray = [
      {
        poster: 'http://cdn.gearpatrol.com/wp-content/uploads/2013/11/Best-Action-Movies-Lead-Full1.jpg',
        name: 'Action Movies',
        details: 'A list of Action Movies'
      },
      {
        poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
        name: 'Suicide Squad',
        details: 'Action Movie'
      }
    ];
    SubCategory.create(testArray,function(err,results){
      addChildToSub({subCategoryId:results[1]._id},
        results[0]._id,
        function(err,res){
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('children');
          var subId = res.body.children[res.body.children.length-1]+'';
          chai.expect(subId).to.equal(results[1]._id+'');
          done();
      });
    });
  });

  it('should respond with an 500 error when trying to add child to non-existence subCategory', function (done) {  
    addChildToSub({subCategoryId:'1'},
      1,
      function(err, res){
        res.should.have.status(500);
        done();
    });
  });

  it('should get children array of a subCategory by id and responds with a 200', function (done) {  
    var newSubCategory = new SubCategory({
      poster: 'http://screenrant.com/wp-content/uploads/suicide-squad-movie-2016-poster.jpeg',
      name: 'Suicide Squad',
      details: 'Action Movie',
      children: [
        "57a33701864fd5bc095d5462",
        "57a33701864fd5bc095d5463",
        "57a33701864fd5bc095d5464",
      ]
    });
    newSubCategory.save(function(err, data) {
      getChildren(data._id,
        function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('children');
          for(var i=0; i<res.body.children.length; i++){
            var subId = res.body.children[i]+'';
            chai.expect(subId).to.equal(data.children[i]+'');
          }
          done();
      });
    });
  });

  it('should respond with an 500 error when trying to get children of non-existence subCategory', function (done) {  
    getChildren(1,
      function(err, res){
        res.should.have.status(500);
        done();
    });
  });

});
