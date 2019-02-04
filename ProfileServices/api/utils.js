/*
 * Utility functions
 */
'use strict';

module.exports =  {
	
	// Use this for all JSON responses
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
	}
		
};
