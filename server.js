require("dotenv").config();

// express config
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

// uploading config
const uploadImage =require("./cloudinary")
const deleteImage = require('./fs');
const upload = require('./multer');
// Create the file upload directory if it does not exist
const uploadDir = process.env.UPLOAD_DIR || "./uploads";


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
require('./auth/auth');
const routes = require('./routes/auth/auth_routes');
app.use('/', routes);


// secure routes
const secureRoute = require('./routes/secure/secure_routes');
app.use('/user', passport.authenticate('jwt', {session: false}), secureRoute)


// image upload
// todo: make a middleware for upload profile image and id and job post images
app.post('/upload', passport.authenticate('jwt', {session: false}) ,upload, (req, res) => {
    const files = req.files;
    const responses = [];
    const f_response = [];

    // Upload images to Cloudinary
    // todo: can make this function just return the url as img_url in the req to continue your proccess
    files.forEach((file) => {
        uploadImage(file, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            responses.push(result);
            if (responses.length === files.length) {
                responses.forEach((resp) => {
                    f_response.push({
                        url: resp.secure_url,
                        public_id: resp.public_id,
                        format: resp.format
                    });
                })
                return res.send(f_response);
            }
        });

    });
});


//comments
const commentRouter = require('./routes/public/comment_router');
app.use('/comment', commentRouter);




// public routes
const job_post_router = require("./routes/public/job_post_router");
app.use("/jobs", job_post_router);
const profile_router = require("./routes/public/profileRoutes");
const {response} = require("express");
app.use("/profile", profile_router);


// deploy server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server had started on port: ${port}`));
