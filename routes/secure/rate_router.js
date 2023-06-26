const Job_rate = require('../../models/job_rate');
const User_rate = require('../../models/user_rate');
const {validate_user_rate, validate_job_rate, user_validation} = require('../../middlewares/validation/rate')

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const {isValidObjectId, ObjectId} = require("mongoose");

router.post('/user/:rated_id',
    validate_user_rate,
    user_validation,
    async (req, res) => {
        try {
            const rater_id = req.user._id || '6463b901b377ff4bae1c9c1a'
            const rated_id = req.params.rated_id || '6463b901b377ff4bae1c9c1a'
            const rating = req.body.rating || 5
            const feedback = req.body.feedback || ""
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

router.post('/job/:rated_job_id',
    validate_user_rate,
    user_validation,
    async (req, res) => {
        try {
            const rater_id = req.user._id || "6463b901b377ff4bae1c9c1a"
            const rated_job_id = req.params.rated_job_id || "6461757025d3b22292e0b2a6"
            const rating = req.body.rating || 5
            const feedback = req.body.feedback || ""
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