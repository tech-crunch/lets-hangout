var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DashboardSchema = new Schema({
	options: {type: [{ subCategoryId: { type: Schema.Types.ObjectId, ref: 'SubCategory'} }]},
	voting: {type: String, default: '{}'},
	date: {type: Date, default: Date.now},
	voters: [{type: String}]
});

var Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard; 
