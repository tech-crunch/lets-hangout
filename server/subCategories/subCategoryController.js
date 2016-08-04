var SubCategory = require('./subCategoryModel.js');

module.exports = {
	
	// function to create new subcategory
	createNew : function (req, res) {
		var poster = req.body.poster;
		var name = req.body.name;
		var details = req.body.details;

		var newSub = SubCategory({
			poster: poster,
			name: name,
			details: details
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
        res.status(200).send(JSON.stringify(subCategory));
      } else{
        res.status(500).send('No such subCategory exists');
      }
    });
	}
};