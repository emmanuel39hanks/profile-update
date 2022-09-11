require("dotenv/config");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");

// Initializing app
const app = express();

// Port number
const port = 3000;

// Enabling CORS

app.use(cors());

// Connecting to database
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log(`Successfully connected to the database ${process.env.DB_URL}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Database error: ${err}`);
});

// Routes
const users = require("./routes/users");

// Middleware to parse contents of the req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport and Session Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Invalid");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
