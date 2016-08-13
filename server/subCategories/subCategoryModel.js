var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// This is the SubCategory Table.
var SubCategorySchema = new Schema({
	poster: {type: String, required: true},
	name: {type: String, required: true},
	details: {type: String, required: true},
	parentId: {type: Schema.Types.ObjectId, ref: 'Categories'}
});

// Setting up the SubCategory Model
var SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;