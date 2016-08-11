var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// users table here.
var usersSchema = new Schema({
	user_id : {type: String , required: true, unique: true},
	name: {type: String , required: true},
	picture: {type: String , required: true},
	friends : [{ type: String, unique: true}]
});

var User = mongoose.model('User',  usersSchema);

module.exports = User;