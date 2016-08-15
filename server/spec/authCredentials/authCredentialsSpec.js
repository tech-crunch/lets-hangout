var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../server.js');

var should = chai.should();

chai.use(chaiHttp);

describe('Auth Credentials Function', function () {
	it('should return 500 when Credentials are not exported', function (done) {
		chai.request(app)
		.get('/api/authCredentials')
		.end(function(err, res) {
			res.should.have.status(500);
			done();
		});
	});

	it('should get Auth0 Credentials when exported and respond with 200', function (done) {
		process.env.AuthClientID = '1';
		process.env.AuthDomain = '2';
		chai.request(app)
		.get('/api/authCredentials')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('AUTH0_CLIENT_ID');
			res.body.should.have.property('AUTH0_DOMAIN');
			res.body.AUTH0_CLIENT_ID.should.equal('1');
			res.body.AUTH0_DOMAIN.should.equal('2');
			done();
		});
	});
});
