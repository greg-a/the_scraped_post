var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
      db.Article.find({}).sort("-createdAt").lean().then(function(dbArticles) {
        res.render("index", {
          articles: dbArticles
        });
      });
    });
}