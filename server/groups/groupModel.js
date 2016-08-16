var mongoose = require('mongoose');

 //creating Groups Model
var groupSchema = new mongoose.Schema({
	groupName: {type: String, required: true},
	groupAdmin: {type: String, required: true}, 
	users: [String],
	dashboards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', unique: true}]
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;