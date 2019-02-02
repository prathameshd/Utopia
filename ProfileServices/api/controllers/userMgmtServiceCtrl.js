/*
 * CONTROLLER
 * All business logic goes here!
 */

'use strict';
// ----- CONSTANTS -----------//
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
var UTOPIA_COLLECTION = "users";
var utils = require("../utils");
//----- END OF CONSTANTS -----//


// Gets the history and mood of given userID
exports.get_history_and_mood = function(req, res) {
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id;
	
	if(jwt_token !== null)
	{
		user_id = jwt.decode(jwt_token, {complete:true}).payload.sub;
	}
	else{
		res.json(utils.custom_JSON_formatter("invalid token", "Check format of Authorization header!"));
	}
	
	
	db.collection(UTOPIA_COLLECTION).find({"userId" : user_id}).toArray(function(err, docs){
		var resultJSON;
		if(err)
			resultJSON = utils.custom_JSON_formatter("error", err); 
		else	
			resultJSON = utils.custom_JSON_formatter("success", docs); 
		
		res.json(resultJSON);
	});
};


// Updates record for given user with history and mood of clicked song
// If document doesn't exist, creates one. Else, updates it.
// Only keeping track of last 10 songs and moods
exports.set_history_and_mood = function(req, res){
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id;
	
	if(jwt_token !== null)
	{
		user_id = jwt.decode(jwt_token, {complete:true}).payload.sub;
	}
	else{
		res.json(utils.custom_JSON_formatter("invalid token", "Check format of Authorization header!"));
	}
	
	var curr_song = req.body.songId;
	var curr_mood = req.body.valence;
	var resultJSON;

	db.collection(UTOPIA_COLLECTION).updateOne( 
						{"userId" : user_id}, 
						{ $push: {
							history: { 
									$each: [curr_song], 
									$slice: -10
								},
							mood:{
									$each: [curr_mood],
									$slice: -10
							}
						 }
							
						},
						{ upsert: true },
						function(err, result){
							if(err)
								resultJSON = utils.custom_JSON_formatter("error", err); 
							else
								resultJSON = utils.custom_JSON_formatter("success", result);
							res.json(resultJSON);	
						});
};


// Fetches logged in user's bio details
exports.get_personal_details = function(req,res){
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id;
	
	if(jwt_token !== null)
	{
		user_id = jwt.decode(jwt_token, {complete:true}).payload.sub;
	}else{
		res.json(utils.custom_JSON_formatter("invalid token", "Check format of Authorization header!"));
	}
	
	db.collection(UTOPIA_COLLECTION).find({"_id" : ObjectId(user_id)}).toArray(function(err, docs){
		var resultJSON;
		if(err)
			resultJSON = utils.custom_JSON_formatter("error", err); 
		else	
		{
			delete docs[0]['password']; 
			resultJSON = utils.custom_JSON_formatter("success", docs); 
		}
		
		res.json(resultJSON);
	});	
}
