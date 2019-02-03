'use strict';
module.exports = function(app) {
  var userMgmt = require('../controllers/AuthServiceCtrl');

  // Routes
  app.route('/getAuth')
  .get(userMgmt.get_auth);
  
  app.route('/getAccess')
  .post(userMgmt.get_access)
  
  app.route('/searchSong')
  .post(userMgmt.search_song)
 
  
  //app.route('/getSongs')
  //  .get(userMgmt.get_songs);
  
  //app.route('/setHistoryAndMood')
  //	.post(userMgmt.set_history_and_mood);
    
};
