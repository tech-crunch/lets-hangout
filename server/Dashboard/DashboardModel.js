var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  options: {type: [{ type : Schema.Types.ObjectId, ref: 'SubCategory' }]},
  chosenOption: { type : Schema.Types.ObjectId, ref: 'SubCategory' },
  voting : {type: Number},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Dashboard', DashboardSchema);