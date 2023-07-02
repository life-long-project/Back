require("dotenv").config();
// express config
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const socketio = require("socket.io");
const nodemon = require("nodemon");
const expressValidator = require("express-validator");

// Mongo db
mongoose.set("strictQuery", false);
mongoose.connect(
  //process.env.DB_URL
  "mongodb+srv://xmosb7:xmosb7@cluster0.hpsckra.mongodb.net/shaghlny?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (error) =>
  console.error("Error while connecting to mongodb " + error)
);
db.on("open", (error) => console.log("Connected to Snapjobs DB"));

// // uploading config
// const {uploadImage,uploadIDs, uploadIDsDummy} = require("./cloudinary");
// const deleteImage = require("./fs");

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
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(req.body, req.params);
  next(); // Pass control to the next middleware
});

// authentication routes
require("./auth/auth");
const routes = require("./routes/auth/auth_routes");
app.use("/", routes);

const profileRouter = require("./routes/public/profileRoutes");
app.use("/profile", profileRouter);

// secure routes
const secureRoute = require("./routes/secure/secure_routes");
app.use(
  "/secure",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);

//admin routes
const adminRoute = require("./routes/admin/admin_router");
app.use("/admin", passport.authenticate("jwt", { session: false }), adminRoute);

//users
// todo: make it secure
const userRoute = require("./routes/public/user_router");
app.use(
  "/user",
  /* passport.authenticate("jwt", {session: false}), */ userRoute
);

// chatgpt routes
// there is error with rate limit
const chatgptRoute = require("./routes/public/chatgpt_router");
app.use("/chat", chatgptRoute);

//rate routes
const rateRoute = require("./routes/secure/rate_router");
app.use("/rate", passport.authenticate("jwt", { session: false }), rateRoute);

// offer routes
const offerRoute = require("./routes/secure/offer_router");
app.use("/offer", passport.authenticate("jwt", { session: false }), offerRoute);

// image upload

// todo: make a middleware for upload profile image and id and job post images
const uploadRoute = require("./routes/public/upload_router");
app.use("/upload",
    passport.authenticate("jwt", { session: false }),
    uploadRoute);

// request all egypt citiies
const { cities, cities_with_code, code_with_cities } = require("./cities");
app.use("/cities", (req, res) => {
  // console.log(cities_with_code['Giza'])
  res.status(200).json(cities);
});

//comments
const commentRouter = require("./routes/public/comment_router");
app.use("/comment", commentRouter);

// public routes
const job_post_router = require("./routes/public/job_post_router");
app.use("/jobs", job_post_router);

const messenger_router = require("./routes/secure/messeges");
app.use(
  "/messenger",
  passport.authenticate("jwt", { session: false }),
  messenger_router
);

const conversation_router = require("./routes/secure/conversation");
app.use(
  "/conversation",
  passport.authenticate("jwt", { session: false }),
  conversation_router
);

// deploy server
const port = process.env.PORT || 3000;
const expressServer = app.listen(port, () =>
  console.log(`server had started on port: ${port}`)
);
const io = require("./socket/index").init(expressServer);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
