var Dashboard = require('./DashboardModel.js');

module.exports = {
  createNew: function (req, res, next) {
    var newDashboard = new Dashboard();
    newDashboard.save(function(err, newDashboard){
          if(err){
            res.status(500).send(err);
          } else {
            res.status(201).send(newDashboard);
          };
        });
  },
  getInfo: function (req, res, next) {
    Dashboard.findOne({_id: req.params.id})
        .exec(function(err, dashboard){
          if(dashboard){
            return res.status(200).send(dashboard);
          };
        });
  },
  eleminateOptions: function (req, res, next) {
    Dashboard.findOneAndUpdate(
      {_id: req.params.id},
      {$pull: {options: req.body.subCategoryId}},
      {new: true},
      function(err, data){
          if(err){
            res.status(500).send(err);  
          }else {
            res.status(200).send(data);
          }
      });
  },

  getchosenOption: function (req, res, next) {
    Dashboard.findOne({_id: req.params.id})
        .exec(function(err, dashboard){
          if(dashboard){
            return res.status(200).send(dashboard.chosenOption);
          }else {
            return res.status(500).send(err)
          }
        });
  },

  voteForOption: function (req, res, next) {
    Dashboard.findOneAndUpdate(
      {_id: req.params.id},
      {$inc: {voting: 1}},
      {new: true},
      function(err, data){
          if(err){
            res.status(500).send(err);  
          }else {
            res.status(200).send(data);
          }
      });
  }
}

