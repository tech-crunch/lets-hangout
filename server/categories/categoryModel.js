var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// categories table here.
var categoriesSchema = new Schema({
	name: {type: String, required: true},
	poster: {type: String, required: true}
});

var Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
