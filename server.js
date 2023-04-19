require("dotenv").config();
require('./auth/auth');

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');

// Mongo db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error("Error while connecting to mongodb " + error));
db.on("open", (error) => console.log("Connected to MongoDB"));


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
app.use(express.urlencoded({extended: false}));



// authentication routes
const routes = require('./routes/auth/auth_routes');
app.use('/', routes);

// secure routes
const secureRoute = require('./routes/secure/secure_routes');
app.use('/user', passport.authenticate('jwt', {session: false}), secureRoute)


// public routes
const job_post_router = require("./routes/public/job_post_router");
app.use("/jobs", job_post_router);
const profile_router = require("./routes/public/profileRoutes");
app.use("/profile", profile_router);




// deploy server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server had started on port: ${port}`));
