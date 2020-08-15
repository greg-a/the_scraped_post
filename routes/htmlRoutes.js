var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
  app.get("/", function (req, res) {

    axios.get("https://www.huffpost.com/news/world-news").then(function (response) {
      var $ = cheerio.load(response.data);
      $("div.card").each(function (i, element) {
        var result = {};
        result.title = $(this).find("h2").text();
        result.link = $(this).children("a").attr("href");
        result.description = $(this).find("div.card__description").text();

        if (result.title && result.link && result.description) {
          db.Article.update(result, result, { upsert: true })
            .then(function (dbArticle) {
              console.log("Scraping...")
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      });
    }).then(function (response) {
      db.Article.find({}).sort("-createdAt").populate("note").lean().then(function (dbArticles) {
        console.log(dbArticles)
        res.render("index", {
          articles: dbArticles
        });
      });
    })
  });
}