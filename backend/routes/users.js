require("dotenv/config");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const e = require("express");

// Register
router.post("/register", (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  // Checking if set username exists in database, if it does, we will return an error message
  User.findOne({ username: newUser.username }, (err, user) => {
    if (user) {
      res.json({
        success: false,
        message: "Username is already in use, try use another username",
      });
      return;
    } else {
      // And then we check if e-mail already exists, if it does, we will return an error message
      User.findOne({ email: newUser.email }, (err, user) => {
        if (user) {
          res.json({
            success: false,
            message: "E-Mail is already in use, try use another e-mail",
          });
          return;
        } else {
          // If both username and e-mail don't exist, we then register the user
          User.addUser(newUser, (err, user) => {
            if (err) {
              res.json({ success: false, message: "Failed to register user" });
            } else {
              res.json({
                success: true,
                message: "Successfully registered user",
              });
            }
          });
          return;
        }
      });
    }
  });
});

// Authenticating user by username, comparing passwords and then sending back a success status along with a JWT token
router.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "User not found" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, process.env.SECRET, {
          expiresIn: 1204800, // Seconds
        });
        res.json({
          success: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        res.json({ success: false, message: "Wrong password" });
      }
    });
  });
});

// Protected route to retrieve profile data
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

// Protected route to update profile data
router.put(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) throw err;
        res.json(updatedUser);
      }
    );
  }
);

module.exports = router;
