var Categories = require('./categoryModel.js');

var repsonseHandler = function(error, req, res, body, next){
  if(error){
    next(error,req,res);
  } else {
    res.status(body.status).send(body.returnObj);
  }
};

module.exports = {
    //get all categories
    getAll : function(req, res, next){
        Categories.find({})
        .exec(function(error, categories){
            repsonseHandler(error, req, res, {status: 200, returnObj:categories}, next);
        });
    },

    // function to get category info by id
    getOne : function (req, res, next) {
        var id = req.params.id.toString();
        Categories.findOne({_id: id})
        .exec(function(err, category){
            repsonseHandler(err, req, res, {status: 200, returnObj:category}, next);
        });
    },

    //add new category
    addCategory : function(req, res, next){
        var newCategory = new Categories ({
            name : req.body.name,
            poster : req.body.poster    
        });
        newCategory.save(function(err, newCategory){
          repsonseHandler(err, req, res, {status: 201, returnObj:newCategory}, next);

        });
    },

    addChild : function(req, res, next){
        Categories.findOneAndUpdate(
            { _id: req.params.id},
            { $push: { children: req.body.id } },
            { new: true },
            function(err, data){
            repsonseHandler(err, req, res, {status: 201, returnObj:data}, next);
            }
        )
    }
}