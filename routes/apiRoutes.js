var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        
        axios.get("https://www.huffpost.com/news/world-news").then(function (response) {
            var $ = cheerio.load(response.data);
            $("div.card").each(function (i, element) {
                var result = {};
                console.log("ready to scrape")
                result.title = $(this).find("h2").text();
                result.link = $(this).children("a").attr("href");
                result.description = $(this).find("div.card__description").text();

                if (result.title && result.link) {
                    db.Article.update(result, result, {upsert: true})
                        .then(function (dbArticle) {
                            console.log("Scraped!");
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            })
            res.redirect('back');
        })
    })
}