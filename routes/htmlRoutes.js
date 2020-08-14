var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
      db.Article.find({}).sort("-createdAt").populate("note").lean().then(function(dbArticles) {
        console.log(dbArticles)
        res.render("index", {
          articles: dbArticles
        });
      });
    });
}