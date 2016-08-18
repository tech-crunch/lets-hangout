var SubCategory = require('./subCategoryModel.js');

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	
	// function to create new subcategory
	createNew: function (req, res, next) {
		var poster = req.body.poster;
		var name = req.body.name;
		var details = req.body.details;
		var parentId = req.body.parentId;

		var newSub = SubCategory({
			poster: poster,
			name: name,
			details: details,
			parentId: parentId
		});

		newSub.save(function(err, newSub) {
			repsonseHandler(err, req, res, {status: 201, returnObj: newSub}, next);
		});
	},

	// function to get subCategory info by id
	getInfo: function (req, res, next) {
		var id = req.params.id.toString();
		SubCategory.findOne({_id: id})
		.exec(function(err, subCategory) {
			repsonseHandler(err, req, res, {status: 200, returnObj: subCategory}, next);
		});
	},

	// function to get array of children object ids
	getChildren: function (req, res, next) {
		var id = req.params.id.toString();
		SubCategory.find({parentId: id})
		.exec(function(err, subCategory) {
			if (err) {
				subCategory = {};
			}
			repsonseHandler(err, req, res, {status: 200, returnObj: subCategory}, next);
		});
	},

	// function to get group of subcategories
	getSubCategories: function (req, res, next) {
		var ids = req.body.ids;
		SubCategory.find({_id: {$in: ids} })
		.exec(function(err, subCategories) {
			repsonseHandler(err, req, res, {status: 200, returnObj: subCategories}, next);
		});
	}
};