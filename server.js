require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

mongoose.Promis = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://user:password123@ds263248.mlab.com:63248/heroku_zmpvt4ml",
  {
    useMongoClient: true
  }
)

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });