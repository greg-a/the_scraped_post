var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.theonion.com/").then(function(response) {
            var $ = cheerio.load(response.data);

            $("article div").each(function(i, element) {
                var result = {};

                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                console.log(result)
            })
        })
    })
}