require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 8080;
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://user:password123@ds263248.mlab.com:63248/heroku_zmpvt4ml", { useNewURLParser: true });

mongoose.connect(MONGODB_URI);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });