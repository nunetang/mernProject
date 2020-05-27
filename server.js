
const PORT = process.env.PORT || 3001;


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookierParser = require("cookie-parser");
const path = require("path");

//ROUTES
const citydb = require("./routes/api/citydb");
const itinerarydb = require("./routes/api/journeydb");
const activitydb = require("./routes/api/activitydb");
const commentdb = require("./routes/api/commentdb");
const cmsdb = require("./routes/api/apricotdb");
const profiledb = require("./routes/api/profiledb");
const usersdb = require("./routes/api/usersdb");
require("./models/usermodel");

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================
const app = express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// API ROUTES
app.use("/api", citydb);
app.use("/api", journeydb);
app.use("/api", activitydb);
app.use("/api", commentdb);
app.use("/api", apricotdb);

// EXPRESS MIDDLWARE
app.use(cookierParser());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// AUTH ROUTES
app.use("/auth", usersdb);
app.use("/auth", profiledb);

//PASSPORT CONFIG
require("./config/passport")(passport);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
