/*
 * CONTROLLER
 * All business logic goes here!
 */

'use strict';
// ----- CONSTANTS -----------//
var ObjectId = require('mongodb').ObjectID;
var UTOPIA_COLLECTION = "users";
var utils = require("../utils");

//----- END OF CONSTANTS -----//

// Mongo client
var MongoClient = require('mongodb').MongoClient;

var MONGO_STRING = "mongodb+srv://achanta:userservice@userservice-recot.mongodb.net/test?retryWrites=true";
// Gets the history and mood of given userID
exports.get_history_and_mood = function(req, res) {

	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;

	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("invalid token", "Check Authorization header!"));
	}

	else{
		db.collection(UTOPIA_COLLECTION).find({"userId" : user_id}).toArray(function(err, docs){
			var resultJSON;
			if(err)
				resultJSON = utils.custom_JSON_formatter("error", err);
			else
				resultJSON = utils.custom_JSON_formatter("success", docs);

			res.json(resultJSON);
		});
	}
};


// Updates record for given user with history and mood of clicked song
// If document doesn't exist, creates one. Else, updates it.
// Only keeping track of last 10 songs and moods
exports.set_history_and_mood = function(req, res){

	var curr_song = req.body.songId;
	var curr_mood = req.body.valence;
	var resultJSON;

	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;


	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("invalid token", "Check Authorization header!"));
	}

	else{
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
	}
};


// Fetches logged in user's bio details
exports.get_personal_details = function(req,res){
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;

	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("invalid token", "Check Authorization header!"));
	}

	else
	{
		// Querying "_id" will give personal details
		// NOTE: Querying "userId" gives history and mood
		MongoClient.connect(MONGO_STRING, function(err, client) {
		  if(err) {
		    console.log(err);
		    return console.error(err);
		  }
			// Global db variable to connect to db
		  var db = client.db('userdb');
			db.collection(UTOPIA_COLLECTION).find({"_id" : ObjectId(user_id)}).toArray(function(err, docs){
				var resultJSON;
				if(err)
					resultJSON = utils.custom_JSON_formatter("error", err);

				else
				{
					delete docs[0]['password'];  // removing password from response
					resultJSON = utils.custom_JSON_formatter("success", docs);
				}
				client.close();
				res.json(resultJSON);

			});
		  // Starting the server
		  console.log("[UserMgmt] NodeJS Server started on: " + port);
		});

	}
}
