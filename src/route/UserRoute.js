const routes = require("express").Router();
const Users = require("../services/UserService.js");

routes.get("/users", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType == 1) {
      Users.getAllUsers()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      return res.status(403).json({
        name: "unAuthorized",
        message: "The user is not authorized to access this",
      });
    }
  } else {
    return res.status(403).json({
      name: "unAuthorized",
      message: "The User is not loggedIn",
    });
  }
});

routes.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    Users.getUserById(req.user._id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    return res.status(403).json({
      name: "unAuthorized",
      message: "The User is not loggedIn",
    });
  }
});

routes.delete("/user", (req, res) => {
  if (req.isAuthenticated()) {
    Users.deleteUserByUsername(req.user.username)
      .then((data) => {
        req.logout();
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(403).json(error);
      });
  } else {
    return res.status(403).json({
      name: "unAuthorized",
      message: "The User is not loggedIn",
    });
  }
});

routes.delete("/user/:username", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.username == req.params.username) {
      Users.deleteUserByUsername(req.user.username)
        .then((data) => {
          req.logout();
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(403).json(error);
        });
    } else {
      if (req.user.userType == 1) {
        Users.deleteUserByUsername(req.params.username)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(403).json(error);
          });
      } else if (req.user.userType == 0) {
        res.status(403).json({
          name: "unAuthorized",
          message: "The user is not Authorized",
        });
      }
    }
  } else {
    return res.json({
      name: "unAuthorized",
      message: "The User is not loggedIn",
    });
  }
});
module.exports = routes;
