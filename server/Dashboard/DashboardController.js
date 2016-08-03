var Dashboard = require('./DashboardModel.js');

module.exports = {
  createNew: function (req, res, next) {
    console.log(req.body)
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
          }
        })
  }
}

