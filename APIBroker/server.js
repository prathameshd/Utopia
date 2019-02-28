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

// ZooKeeper Service registration
var zookeeper = require('node-zookeeper-client');
var client = zookeeper.createClient('localhost:2181');
var path = "/APIBroker";
var data ={host: "localhost", port: "3002"}
client.once('connected', function () {
    console.log('[APIBroker] Connected to ZOOKEEPER!');
 
    client.create(path, new Buffer(JSON.stringify(data)), function (error) {
        if (error) {
            console.log('[APIBroker]  Failed to create node: %s due to: %s.', path, error);
        } else {
            console.log('[APIBroker]  Node: %s is successfully created.', path);
        }
 
        client.close();
    });
});
 
client.connect();
