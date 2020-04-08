// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


  app.post("/api/addNote", function(req, res) {
    db.Notes.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user.id
    })
      .then(function(result) {
        res.redirect("/members")
      })
      // .catch(function(err) {
      //   res.status(401).json(err);
      // });
  });

app.delete("/api/members/:id", function(req, res){
  db.Notes.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(dbNotes){
    res.json(dbNotes)
    res.location.reload()
    
  })
})

  // route to delete a contact 
  app.delete("/api/contact/:id", function(req, res){
    db.Contact.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbContacts){
      res.json(dbContacts)
      res.location.reload()
    })
  })

  // Get route for retrieving a single post
  app.get("/api/addNote/:id", function(req, res) {
    db.Notes.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/addContact/:id", function(req, res) {
    db.Contact.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

app.put("/api/addNote", function(req, res) {
  db.Notes.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.put("/api/addContact", function(req, res) {
  db.Contact.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});



app.post("/api/addContact", function(req, res) {
  console.log("req is here:")
  

  db.Contact.create({
    name: req.body.name,
    phoneNumber: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    UserId: req.user.id,
  })
    .then(function(result) {
      // console.log(result);
      res.redirect("/contacts")
    })
    // .catch(function(err) {
    //   res.status(401).json(err);
    // });
});



app.get("/api/contacts", function(req, res){
  db.Contact.findAll().then(function(dbContact) {
    res.json(dbContact)
      console.log(dbContact)
    })
  });







};
