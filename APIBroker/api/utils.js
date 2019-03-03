/*
 * Utility functions
 */
'use strict';
var jwt = require('jsonwebtoken');

module.exports =  {
	custom_JSON_formatter: function (msg, content){
		return {message: msg, data: content};
	},
	
	// Use this to extract token from the Authorization header
	// If header not in proper format, return null
	get_token_from_header: function(req){
		 if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			 return req.headers.authorization.split(' ')[1];
		 }
		 else{
			 return null;
		 }
	},
	
	// Verifies token signature and returns userId if it's proper
	check_validity_and_get_user_id: function(token){
		try{
			var decoded = jwt.verify(token, 'utopia');
			return decoded.sub;
		} catch(err){
			return null;
		}
		
	}
		
};