/*
 * Server.js
 * All main configs go here!
 */

// Express
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser');

// ZooKeeper Service registration
var zookeeper = require('node-zookeeper-client');
var client = zookeeper.createClient('149.165.170.7:2181');
var path = "/ProfileServices";


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
const axios = require("axios");
var hostAddress="";

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



//getting the IP
dynamicAddress=function(){
    axios({
      method:'get',
      url: 'https://ip.42.pl/raw',
    }).then((response)=>{
      console.log("got the IP")
       hostAddress=response.data
       var data={host:hostAddress,port:'3002'}

        client.once('connected', function () {
    console.log(data)
    console.log('[APIBroker] Connected to ZOOKEEPER!');
 
    client.create(path, new Buffer(JSON.stringify(data)), function (error) {
        if (error) 
        {
            console.log('[APIBroker]  Failed to create node: %s due to: %s.', path, error);
        }
        else
        {
            console.log('[APIBroker]  Node: %s is successfully created.', path);
        }
 
        client.close();
    });
    });
 
client.connect();

    }).catch((err)=>{
      res.status(400).json(utils.custom_JSON_formatter('error',err))
    });
    return hostAddress
    
}
var temp;
temp=dynamicAddress();



