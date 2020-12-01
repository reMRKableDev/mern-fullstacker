const { Router } = require("express");
const router = Router();

const passport = require("passport");
const bcrypt = require("bcrypt");

// require the user model !!!!
const User = require("../models/user.model");

/* SIGNUP ROUTE */
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    // In case of any server errors that may occur
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    // If the username already exists
    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    // Generate salt for hashing password
    const salt = bcrypt.genSaltSync(10);

    // Hash the incoming password
    const hashPass = bcrypt.hashSync(password, salt);

    // Create a new user with incoming username & hashed password
    const aNewUser = new User({
      username: username,
      password: hashPass,
    });

    // Attempt to save the new user to the database
    aNewUser.save((err) => {
      // When/If any issues arise while saving the user to the database
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});

/* LOGIN ROUTE */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

/* LOGOUT ROUTE */
router.post("/logout", (req, res) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

/* LOGGEDIN */
router.get("/loggedin", (req, res) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
