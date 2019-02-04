'use strict';
module.exports = function(app) {
  var spotifyAuth = require('../controllers/AuthServiceCtrl');

  // Routes
  app.route('/getAuth')
  .get(spotifyAuth.get_auth);
  
  app.route('/getAccess')
  .post(spotifyAuth.get_access)
  
  app.route('/searchSong')
  .post(spotifyAuth.search_song)
    
};
