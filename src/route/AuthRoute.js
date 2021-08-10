const passport = require("passport");
const routes = require("express").Router();
const User = require("../mongoSchema/UserSchema.js");

routes.post("/register", function (req, res) {
  User.register(
    new User({
      username: req.body.username,
      userType: req.body.userType,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("registered");
          res.status(201).json(true);
        });
      }
    }
  );
});

routes.post("/login", passport.authenticate("local"), function (req, res) {
  res.status(200).json(true);
});

routes.get("/logout", function (req, res) {
  req.logOut();
  res.status(200).json(true);
});

routes.get("/check", function (req, res) {
  if (req.isAuthenticated()) {
    res.send({ loggedIn: true });
    console.log(req.user);
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = routes;
