const Job_rate = require('../../models/job_rate');
const User_rate = require('../../models/user_rate');

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const {isValidObjectId, ObjectId} = require("mongoose");

router.post('/user/:rated_id', async (req, res) => {
    try {
        const rater_id = req.user._id
        const rated_id = req.params.rated_id
        const rating = req.body.rating
        const feedback = req.body.feedback
        const new_user_rate = new User_rate({
            rater_id,
            rated_id,
            rating,
            feedback
        })
        console.log(new_user_rate)
        await new_user_rate.save();
        res.status(201).json({message: "Success"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})

router.post('/job/:rated_job_id', async (req, res) => {
    try {
        const rater_id = req.user._id
        const rated_job_id = req.params.rated_job_id
        const rating = req.body.rating
        const feedback = req.body.feedback
        const new_job_rate = new Job_rate({
            rater_id,
            rated_job_id,
            rating,
            feedback
        })
        await new_job_rate.save();
        res.status(201).json({message: "Success"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})


module.exports = router