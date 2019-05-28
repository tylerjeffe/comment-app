let scrape = require("../scripts/scrape");

let headlinesController = require("../controllers/headlines");
let notesController = require("../controllers/notes");

module.exports = function(router) {
  // route for rendering the handlebars homepage
  router.get("/", function(req, res) {
    res.render("home.handlebars");
  });
  // renders the saved.handlebars page
  router.get("/saved", function(req, res) {
    res.render("saved.handlebars");
  });

  router.get("/api/fetch", function(rec, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new Timbers news! Check back in later."
        });
      } else {
        res.json({
          message: "Here are the " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  router.get("/api/headlines", function(req, res) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });

  router.delete("/api/headlines/:id", function(req, res) {
    let query = {};
    query._id - req.params.id;
    headlinesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data) {
      res.json(data);
    });
  });

  router.get("/api/notes/:headline_id?", function(req, res) {
    let query = {};

    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    notesController.get(query, function(err, data) {
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", function(req, res) {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {
      res.json(data);
    });
  });
};