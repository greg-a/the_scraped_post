var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
    //   db.room.findAll({}).then(function(dbExamples) {
    //     res.render("index", {
    //       rooms: dbExamples
    //     });
    //   });
    res.render("index")
    });
}