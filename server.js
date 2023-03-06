require("dotenv").config();
require('./auth/auth');
const routes = require('./routes/auth/auth_routes');
const secureRoute = require('./routes/secure/secure_routes');




const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const UserModel = require('./models/user');
// Mongo db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) =>
  console.error("Error while connecting to mongodb " + error)
);
db.on("open", (error) => console.log("Connected to MongoDB"));

//back-end magic
//todo: don't forget to delete CORS

// CORS is enabled for all origins
app.use(cors());

// middleware for OPTIONS method
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json();
  }
  next();
});

//json middleware
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)
// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});


// todo: adding authentication / authorization middlewares

// routes
const job_post_router = require("./routes/public/job_post_router");
app.use("/jobs", job_post_router);

const profile_router = require("./routes/public/profileRoutes");
app.use("/profile", profile_router);

// deploy server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server had started on port: ${port}`));
