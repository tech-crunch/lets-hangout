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
        res.json(newSub);
      } else {
        res.status(500).send('An error occured');
      }
    });
	},
};