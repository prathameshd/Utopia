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

  app.route('/getValence')
  .post(spotifyAuth.get_valence)

  app.route('/getRecommendedTracks')
  .post(spotifyAuth.get_recommended_track)
  
    //app.route('/passIp')
  .//post(spotifyAuth.pass_ip)
    
};
