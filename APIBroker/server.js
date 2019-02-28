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
const axios = require("axios");

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
var client = zookeeper.createClient('149.165.170.7:2181');
var path = "/APIBroker";
var hostAddress=" ";

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
<<<<<<< HEAD
    });
 
=======
});

>>>>>>> ecec4cf9e234458bb31f4caf9723f8865d9ad270
client.connect();

    }).catch((err)=>{
      res.status(400).json(utils.custom_JSON_formatter('error',err))
    });
    return hostAddress
    
}
var temp;
temp=dynamicAddress();

