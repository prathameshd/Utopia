'use strict';
module.exports = function(app) {
  var userMgmt = require('../controllers/userMgmtServiceCtrl');

  // Routes
  app.route('/getHistoryAndMood/:userId')
    .get(userMgmt.get_history_and_mood);
  
  app.route('/setHistoryAndMood')
  	.post(userMgmt.set_history_and_mood);
    
};
