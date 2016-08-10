var Dashboard = require('./DashboardModel.js');

var repsonseHandler = function(error, req, res, body, next){
  if(error){
    next(error,req,res);
  } else {
    res.status(body.status).send(body.returnObj);
  }
};

module.exports = {
  createNew: function (req, res, next) {
    var newDashboard = new Dashboard();
    newDashboard.save(function(err, newDashboard){
      repsonseHandler(err, req, res, {status: 201, returnObj:newDashboard}, next);
    });
  },

  getInfo: function (req, res, next) {
    Dashboard.findOne({_id: req.params.id})
      .exec(function(err, dashboard){
        repsonseHandler(err, req, res, {status: 200, returnObj:dashboard}, next);
      });
  },

  eleminateOptions: function (req, res, next) {
    Dashboard.findOneAndUpdate(
      {_id: req.params.id},
      {$pull: {options: {subCategoryId: req.body.subCategoryId}}},
      {new: true},
      function(err, dashboard){
        repsonseHandler(err, req, res, {status: 200, returnObj:dashboard}, next);
      });
  },

  addOption : function (req, res, next) {
    Dashboard.findOneAndUpdate(
      {_id: req.params.id},
      { $push: { options: {subCategoryId: req.body.subCategoryId} } },
      {new: true},
      function(err, dashboard){
          repsonseHandler(err, req, res, {status: 200, returnObj:dashboard}, next);
      });
  },

  getchosenOption: function (req, res, next) {
    Dashboard.findOne({_id: req.params.id})
      .exec(function(err, dashboard){
        repsonseHandler(err, req, res, {status: 200, returnObj:dashboard.chosenOption}, next);
      });
  },

  voteForOption: function (req, res, next) {
    Dashboard.findOneAndUpdate(
      {_id: req.params.id, "options.subCategoryId": req.body.subCategoryId},
      {$inc: {"options.$.voting": 1}},
      {new: true},
      function(err, dashboard){
        repsonseHandler(err, req, res, {status: 200, returnObj:dashboard}, next);
      });
  }
}

