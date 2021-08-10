const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();
const Mongoose = require("./configuration/mongooseConfig.js");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./mongoSchema/UserSchema.js");

app.use(
  require("express-session")({
    secret:
      "45780711e8d65e8ecf26aa59d5c2f911922f4545cf7448c3c37ba4533c1bde5136714464227994da7e4ed9d812d9ae60be5a26fb0fc63df830acbd85528d3356",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const auth = require("./route/AuthRoute.js");
app.use(auth);
const userRoute = require("./route/UserRoute.js");
app.use(userRoute);

app.get("/", (req, res) => {
  console.log(process.env.ACCESS_TOKEN_SECRET);
  res.json({ message: "Welcome to admin-restApi-demo " });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running at PORT:", PORT);
});
