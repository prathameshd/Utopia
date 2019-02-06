/*
 * Server.js
 * All main configs go here!
 */

// Express
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser');

// Mongo client
var MongoClient = require('mongodb').MongoClient;

var MONGO_STRING = "mongodb+srv://achanta:userservice@userservice-recot.mongodb.net/test?retryWrites=true";

MongoClient.connect(MONGO_STRING, function(err, client) {
  if(err) {
	  console.log(err);
	  return console.error(err);
  }
  
  // Global db variable to connect to db
  global.db = client.db('userdb');
  
  // Starting the server
  app.listen(port);
  console.log("[UserMgmt] NodeJS Server started on: " + port); 
});

const cors = require('cors')

// For parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // supports JSON encoded bodies for POST
app.use(express.urlencoded()); // supports URL encoded bodies
app.use(cors())

//importing route
var routes = require('./api/routes/userMgmtServiceRoutes'); 

//register the route
routes(app); 
