'use strict';
var ObjectId = require('mongodb').ObjectID;
var UTOPIA_COLLECTION = "users";
var utils = require("../utils");

// Gets the history and mood of given userID
exports.get_history_and_mood = function(req, res) {
	
	db.collection(UTOPIA_COLLECTION).find({"userId" : ObjectId(req.params.userId)}).toArray(function(err, docs){
		var resultJSON;
		if(err)
			resultJSON = utils.custom_JSON_formatter("error", err); 
		else	
			resultJSON = utils.custom_JSON_formatter("success", docs); 
		
		res.json(resultJSON);
	});
};

// Updates record for given user with history and mood of clicked song
exports.set_history_and_mood = function(req, res){
	var curr_song = req.body.songId;
	var curr_mood = req.body.valence;
	var user_id = req.body.userId;
	var resultJSON;
	
	db.collection(UTOPIA_COLLECTION).updateOne( 
						{"_id" : ObjectId(user_id)}, 
						{ $push: {history: curr_song, mood: curr_mood}},
						function(err, result){
							if(err)
								resultJSON = utils.custom_JSON_formatter("error", err); 
							else
								resultJSON = utils.custom_JSON_formatter("success", result);
							res.json(resultJSON);	
						});
};
