var mongoose = require('mongoose');

 //creating Groups Model
var groupSchema = new mongoose.Schema({
  groupName: {type: String, required: true},
  groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref:'User' }, 
  users:[{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  dashboard: [{type: mongoose.Schema.Types.ObjectId, ref:'Dashboard'}]
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;