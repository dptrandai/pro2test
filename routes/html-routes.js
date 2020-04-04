// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
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

    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    const hbsObject2={}
    res.render("login", hbsObject2)
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  
  
  app.get("/members", isAuthenticated, function(req, res) {

    db.User.findAll({
      where: {id: req.user.id},
      include: [{model: db.Notes}],
      raw: true,}).then(function(dbNotes){  
      
      // var notes = dbNotes.map(function(note){
      //   return {
      //     id: note["Notes.id"],
      //     title: note["Notes.title"],
      //     body: note["Notes.body"]
      //   }
      // })

      let hbsObject = {
        notes: dbNotes
      }
      console.log(hbsObject)
      res.render("members", hbsObject)

    })
  });

  app.get("/addNote", isAuthenticated, function(req, res) {

      var hbsObject = {}
      res.render("addNote", hbsObject)

    
  });






    
  // app.get("/members", isAuthenticated, function(req,res){
    
  //   db.Notes.findAll({
      
  //     raw:true}).then(function(dbNotes){


    
  //     var hbsObject = {
  //       notes: dbNotes
  //     }

  //     console.log(hbsObject)
     
  //     res.render("members", hbsObject)
  //   })

  // })  
  
};
