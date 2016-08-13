var mongoose = require('mongoose');

 //creating Groups Model
var groupSchema = new mongoose.Schema({
<<<<<<< b9b9bf40f70aa9b5c9cdfba587a0503a410364e1
	groupName: {type: String, required: true, unique: true },
	groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	dashboard: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard'}]
	
=======
  groupName: {type: String, required: true},
  groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref:'User' }, 
  users:[{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  dashboard: [{type: mongoose.Schema.Types.ObjectId, ref:'Dashboard'}]
  
>>>>>>> update routes for group controller
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;