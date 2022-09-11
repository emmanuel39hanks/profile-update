const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Defining the user schema

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Exporting user schema
const User = (module.exports = mongoose.model("User", UserSchema));

// Getting user by ID
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};


// Getting user by username
module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
};


// Adding a new user, hashing the password and then saving the user to the database

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
  newUser.save();
};


// Comparing sent password upon login and comparing it with the hashed password in the user document
module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};