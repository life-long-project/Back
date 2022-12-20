require("dotenv").config()

const express = require('express')
const app = express()

const mongoose = require("mongoose")

// Mongo db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', (error) => console.log("Connected to MongoDB"))



//back-end magic

//json middleware
app.use(express.json())

// todo: adding authentication / authorization middlewares


// routes
const job_post_router = require('./routes/job_post_router')
app.use('/jobs', job_post_router)


// deploy server
app.listen(3000, () => console.log("server had started"))