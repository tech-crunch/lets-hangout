var Categories = require('./categoryModel.js');
// Promisify a few mongoose methods with the `q` promise library
module.exports = {
    //get all categories
    getAll : function(req, res, next){
        Categories.find({})
        .exec(function(error, categories){
            if(error){
                res.status(500).send(error);
            } else {
                console.log(categories);
                res.status(200).send(categories);
            }
        });
    },
    //add new category
    addCategory : function(req, res, next){
        console.log(req.body)
        var newCategory = new Categories ({
            name : req.body.name,
            poster : req.body.poster
            
        });
        newCategory.save(function(err, newCategory){
            if(err){
                res.status(500).send(err);
            } else {
                console.log(newCategory)
                res.status(201).send(newCategory);
            };
        });
    },
    addChild : function(req, res, next){
        Categories.update(
            {name : req.body.name},
            { $push: { children: req.body.id } },
            { upsert: true } // upsert looks to find a Message with that id and if it doesn't exist creates the Message 
        )
        .then (function (err, data){
            res.status(201).send(data)
        })
    }
}