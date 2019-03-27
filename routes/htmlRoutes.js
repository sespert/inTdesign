var db = require("../models");

module.exports = function(app) {
  // Load index page

  // loads all users
  app.get("/all_users", function(req, res) {
    db.users.findAll().then(function(allUserInfo) {
      res.render("index", { userInfo: allUserInfo });
    });
  });
  // loads all modules
  app.get("/modules", function(req, res) {
    db.modules.findAll().then(function(modules) {
      res.render("index", { modules: modules });
    });
  });
  // loads all businesses
  app.get("/business", function(req, res) {
    db.businesstype.findAll().then(function(types) {
      res.render("index", { businessTypes: types });
    });
  });

  // Get user info by chosen Id and populates the chosen template
  app.get("/template1/:id", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(userInfo) {
      res.render("template1", {user: userInfo});
    });
  });
  app.get("/template2/:id", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(userInfo) {
      res.render("template2", {user: userInfo});
    });
  });
  app.get("/template3/:id", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(userInfo) {
      res.render("template3", {user: userInfo});
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
