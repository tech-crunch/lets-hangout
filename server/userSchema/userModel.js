var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// users table here.
var usersSchema = new Schema({
	username : {type: String , required: true},
	authentication : {type : String , required: true}
});

var User = mongoose.model('User',  usersSchema);

module.exports = User;