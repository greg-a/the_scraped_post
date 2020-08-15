var db = require("../models");


module.exports = function (app) {   

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbNotes) {
                res.json(dbNotes);
                console.log(dbNotes)
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbArticle) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbArticle._id } }, { new: true })
            })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/delete/:id", function (req, res) {
        db.Note.remove(
            {
                _id: req.params.id
            }
        )
            .then(function (dbArticle) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbArticle._id } }, { new: true })
            })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};