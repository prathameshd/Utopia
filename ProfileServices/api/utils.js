/*
 * Utility functions
 */
'use strict';

module.exports =  {
	custom_JSON_formatter: function (msg, content){
		return {message: msg, data: content};
	},
	get_token_from_header: function(req){
		return req.headers.authorization.split(' ')[1];
	}
		
};