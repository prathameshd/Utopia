/*
 * Server.js
 * All main configs go here!
 */

// Express
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  bodyParser = require('body-parser');

const cors = require('cors')

// For parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // supports JSON encoded bodies for POST
app.use(express.urlencoded()); // supports URL encoded bodies
app.listen(port);
console.log("[APIBroker] NodeJS Server started on: " + port); 

app.use(cors())

//importing route
var routes = require('./api/routes/APIBrokerRoutes'); 

//register the route
routes(app); 
