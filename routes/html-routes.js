const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    hbsObject = {}
    res.render("signup", hbsObject);
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    const hbsObject2={}
    res.render("login", hbsObject2)
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  
  app.get("/members", isAuthenticated, function(req, res) {
    db.User.findAll({
      where: {id: req.user.id},
      include: [{model: db.Notes}],
      raw: true,}).then(function(dbNotes){  
      let hbsObject = {
        notes: dbNotes
      }
      res.render("members", hbsObject)
    })
  });

  app.get("/contacts", isAuthenticated, function(req, res) {
    db.User.findAll({
      where: {id: req.user.id},
      include: [{model: db.Contact}],
      raw: true,}).then(function(dbContacts){  
      let hbsObject = {
        contacts: dbContacts
      }
      res.render("contact", hbsObject)
    })
  });

  app.get("/addNote", isAuthenticated, function(req, res) {
      var hbsObject = {}
      res.render("addNote", hbsObject)    
  });

  app.get("/addContact", isAuthenticated, function(req, res) {
    var hbsObject = {}
    res.render("addContact", hbsObject)
  });
};
