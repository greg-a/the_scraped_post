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

                if (result.title && result.link && result.description) {
                    db.Article.update(result, result, { upsert: true })
                        .then(function (dbArticle) {
                            console.log("Scraped!");
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            });
            res.redirect('back');
        });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbNotes) {
                res.json(dbNotes);
                console.log(dbNotes)
            })
            .catch(function(err) {
                res.json(err);
            })
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbArticle) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { note: dbArticle._id } }, { new: true })
            })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};