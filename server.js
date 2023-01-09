require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")

// Mongo db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', (error) => console.log("Connected to MongoDB"))


//back-end magic
//todo: don't forget to delete CORS

// CORS is enabled for all origins
app.use(cors());

// middleware for OPTIONS method
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
        return res.status(200).json();
    }
    next()
})


//json middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));


// todo: adding authentication / authorization middlewares


// routes
const job_post_router = require('./routes/job_post_router')
app.use('/jobs', job_post_router)


// deploy server
app.listen(3000, () => console.log("server had started"))