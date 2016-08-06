var SubCategory = require('./subCategoryModel.js');

var repsonseHandler = function(error, req, res, body, next){
  if(error){
    next(error,req,res);
  } else {
    res.status(body.status).send(body.returnObj);
  }
};

module.exports = {
	
	// function to create new subcategory
	createNew : function (req, res, next) {
		var poster = req.body.poster;
		var name = req.body.name;
		var details = req.body.details;
		var children = req.body.children || [];

		var newSub = SubCategory({
			poster: poster,
			name: name,
			details: details,
			children: children
		});

		newSub.save(function(err, newSub){
      repsonseHandler(err, req, res, {status: 201, returnObj:newSub}, next);
    });
	},

	// function to get subCategory info by id
	getInfo : function (req, res, next) {
		var id = req.params.id.toString();
		SubCategory.findOne({_id: id})
    .exec(function(err, subCategory){
      repsonseHandler(err, req, res, {status: 200, returnObj:subCategory}, next);
    });
	},

	//	function to add a child to subcategory
	addChild: function (req, res, next) {
		var id = req.params.id.toString();
		
    var error;

		SubCategory.update({ _id: id },
      { $pull: { children: req.body.subCategoryId } }
    );
    
    SubCategory.findOneAndUpdate({ _id: id },
      { $push: { children: req.body.subCategoryId } },
      { new: true },
      function (err, savedSubCategory) {
        repsonseHandler(err, req, res, {status: 201, returnObj:savedSubCategory}, next);
    });
	},

	// function to get array of children object ids
	getChildren : function (req, res, next) {
		var id = req.params.id.toString();
		SubCategory.findOne({_id: id})
    .exec(function(err, subCategory){
      if(err){
        subCategory = {};
      }
      repsonseHandler(err, req, res, {status: 200, returnObj: { children : subCategory.children } }, next);
    });
	}
};