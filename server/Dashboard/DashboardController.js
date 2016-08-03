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
  }
}

