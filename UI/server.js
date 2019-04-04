const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const gravatar = require("gravatar");


const app = express();
//jenkins test
const users = require("./routes/api/users");

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DB Config
const db = require("./config/keys").mongoURI;

//Connects to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err)); 

app.get('/', (req, res) => res.send('Hello Peeps!'));

//Use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ' +port));
