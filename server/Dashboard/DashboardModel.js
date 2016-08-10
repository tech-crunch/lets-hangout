var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DashboardSchema = new Schema({
<<<<<<< 97b69d1f8b7255ed742abbeefb2c995f2f2d7cd6
=======
 //groupId: {type: Schema.Types.ObjectId, ref:'Group'},
>>>>>>> create group and return dashboards for group
  options: {type: [{ subCategoryId:{ type : Schema.Types.ObjectId, ref: 'SubCategory' }, voting: {type: Number, default: 0}  }]},
  chosenOption: { type : Schema.Types.ObjectId, ref: 'SubCategory' },
  date: {type: Date, default: Date.now}
});
var Dashboard =mongoose.model('Dashboard', DashboardSchema);
module.exports = Dashboard; 
