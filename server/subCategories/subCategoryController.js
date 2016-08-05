var SubCategory = require('./subCategoryModel.js');

module.exports = {
	
	// function to create new subcategory
	createNew : function (req, res) {
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

		newSub.save(function(error, newSub){
      if(newSub){
        res.status(201).send(newSub);
      } else {
        res.status(500).send('An error occured');
      }
    });
	},

	// function to get subCategory info by id
	getInfo : function (req, res) {
		var id = req.params.id.toString();
		SubCategory.findOne({_id: id})
    .exec(function(err, subCategory){
      if(subCategory){
        res.status(200).send(subCategory);
      } else{
        res.status(500).send('No such subCategory exists');
      }
    });
	},

	//	function to add a child to subcategory
	addChild: function (req, res) {
		var id = req.params.id.toString();
		
    var error;

		SubCategory.update({ _id: id },
      { $pull: { children: req.body.subCategoryId } },
      function(err){
        if(err){
          error = err;  
        }
    });
    SubCategory.findOneAndUpdate({ _id: id },
      { $push: { children: req.body.subCategoryId } },
      { new: true },
      function (err, savedSubCategory) {
        if(err){
          error = err;
        }
        else{
          res.status(201).send(savedSubCategory);
        }
    });

    if(error){
      res.status(500).send(error);
    }
	},

	// function to get array of children object ids
	getChildren : function (req, res) {
		var id = req.params.id.toString();
		SubCategory.findOne({_id: id})
    .exec(function(err, subCategory){
      if(subCategory){
        res.status(200).send( { children : subCategory.children } );
      } else{
        res.status(500).send('No such subCategory exists');
      }
    });
	}
};