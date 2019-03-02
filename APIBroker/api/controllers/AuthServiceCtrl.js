'use strict';
const axios = require("axios");
var utils = require("../utils");
var globalIp;

exports.get_auth = function(req, res) {
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;
	
	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("error", "Invalid Token: Check Authorization header!"));
	}
	
	else{
		axios({
			method:'get',
			url: 'https://accounts.spotify.com/en/authorize?client_id=ff30334df8504b849b0fddebe2662ab0&response_type=code&redirect_uri=http:%2F%2F149.165.169.216:3000/home',
		}).then((response)=>{
			console.log("Successfully Authorized with SPOTIFY !!!!!!!")
			var url = response["request"]["res"]["responseUrl"]
			res.json(utils.custom_JSON_formatter('success',url))
			
		}).catch((err)=>{
			res.status(400).json(utils.custom_JSON_formatter('error',err))
		});
	}
};

exports.get_access = function(req, res) {
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;
	
	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("error", "Invalid Token: Check Authorization header!"));
	}
	
	else{
		var codeCode=req["body"]["codeCode"];		//this is the code extracted from URL and sent by react
		
		var bodyParams={							//request body parameters
				grant_type:"authorization_code",
				code:codeCode,
				redirect_uri:'http://149.165.169.216:3000/home'
				};
		
		var keys='ff30334df8504b849b0fddebe2662ab0:e6cd63426b70498d8d07339e460015f1'; //client_id:client_secret
		var codedKeys=Buffer.from(keys).toString('base64');								//base64 encoded keys
	
			axios({
			method:'post',
			url: 'https://accounts.spotify.com/api/token',
			params:bodyParams,										//to encode body params in application/x-www-form-urlencoded
			headers: {'Access-Control-Allow-Origin': '*',								//ref:Sporify Authorization Guide(step2)
					'Authorization': 'Basic '+codedKeys,
					'Content-Type':'application/x-www-form-urlencoded' }
			
			}).then((response)=>{
				var accessToken=response["data"]["access_token"]
				res.json(utils.custom_JSON_formatter('success',accessToken))
				
			}).catch((err)=>{
				res.status(400).json(utils.custom_JSON_formatter('error',err))
			});
	}
};

exports.search_song = function(req, res) {
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;
	
	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("error", "Invalid token: Check Authorization header!"));
	}
	else
	{
		var query=req["body"]["q"];
		var accessToken=req["body"]["access_token"]
		return axios
			({
				method:'get',
				url:'https://api.spotify.com/v1/search?q='+query+'&type='+'track',
				headers: {
					'Access-Control-Allow-Headers': '*',
					'Authorization':'Bearer '+accessToken,
					'Content-Type':'application/x-www-form-urlencoded'
				}
			
			})
		.then((response)=>
			{
				res.json(utils.custom_JSON_formatter('success',response["data"]))
			}).catch(err => {
				res.status(401).json(utils.custom_JSON_formatter("error", err));
			});
	} //else ends
}

// Function that fetches valence value 
// for given song
exports.get_valence = function(req, res) {
	
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;
	
	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("error", "Invalid token: Check Authorization header!"));
	}
	else
	{
		var songId=req["body"]["songId"];
		var accessToken=req["body"]["access_token"]
		return axios
			({
				method:'get',
				url:'https://api.spotify.com/v1/audio-features/'+songId,
				headers: {
					'Access-Control-Allow-Headers': '*',
					'Authorization':'Bearer '+ accessToken
				}
			
			})
		.then((response)=>
			{
				console.log(response.data)
				res.json(utils.custom_JSON_formatter('success',response["data"]))
			}).catch(err => {
				res.status(401).json(utils.custom_JSON_formatter("error", err));
			});
	} //else ends
}


// Function that returns reco tracks given valence
exports.get_recommended_track = function(req, res){
	// Gets token from auth header and decodes it for the user_id
	var jwt_token = utils.get_token_from_header(req);
	var user_id = (jwt_token != null)? utils.check_validity_and_get_user_id(jwt_token) : null;
	
	if(user_id == null)
	{
		res.status(401).json(utils.custom_JSON_formatter("error", "Invalid token: Check Authorization header!"));
	}
	else
	{
		var valence = req["body"]["valence"]
		var accessToken=req["body"]["access_token"]
		return axios
			({
				method:'get',
				url:'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&valence='+valence,
				headers: {
					'Access-Control-Allow-Headers': '*',
					'Authorization':'Bearer '+ accessToken
				}
			
			})
		.then((response)=>
			{
				console.log(response.data.tracks)
				res.json(utils.custom_JSON_formatter('success',response["data"].tracks))
			}).catch(err => {
				res.status(401).json(utils.custom_JSON_formatter("error", err));
			});

	}
}

//function to get IP from react
/*exports.pass_ip = function(req, res) {
	globalIp=req.data;
	console.log("value from react is"+globalIp);
}*/
