require("dotenv").config();
const { io } = require("socket.io-client");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Mongo db

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
app.use(express.urlencoded({ extended: true }));

// todo: adding authentication / authorization middlewares

// routes
const job_post_router = require("./routes/job_post_router");
app.use("/jobs", job_post_router);

const profile_router = require("./routes/profileRoutes");
app.use("/profile", profile_router);

const messenger_router = require("./routes/messenger");
app.use("/messenger", messenger_router);

const admin_router = require("./routes/adminRouter");
app.use("/admin", admin_router);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// deploy server
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    const server = app.listen(port, () =>
      console.log(`server had started on port: ${port}`)
    );
    const io = require("./socket").init(server);
    io.on("connection", (socketio) => {
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const db = mongoose.connection;
// db.on("error", (error) =>
//   console.error("Error while connecting to mongodb " + error)
// );
// db.on("open", (error) => console.log("Connected to MongoDB"));
