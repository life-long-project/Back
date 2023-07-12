const User = require("../../models/user")
const Job = require("../../models/job_post")
const express = require('express')
const router = express.Router()
const Rate = require("../../models/user_rate")
const Offer = require('../../models/offer')
const mongoose = require("mongoose");
const {isValidObjectId, ObjectId} = require("mongoose");

// todo: don't forget to change the authorization

// get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users: users
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

//  get specific user
router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    if (user_id !== null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user = await User.findById(user_id)
            res.status(200).json({
                user: user
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    } else {
        res.status(400).json({
            message: "invalid user id"
        })
    }
})

// get all jobs the user had posted
router.get('/jobs/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    if (user_id !== null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user_jobs = await Job.find({'posted_by_id': user_id})
            res.status(200).json({
                jobs: user_jobs
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    } else {
        res.status(400).json({
            message: "invalid user id"
        })
    }
})

// get all jobs the user accepted for
router.get('/acquired_jobs/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    if (user_id !== null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user_jobs = await Job.find({'accepted_user_id': user_id})
            res.status(200).json({
                jobs: user_jobs
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    } else {
        res.status(400).json({
            message: "invalid user id"
        })
    }
})

// get all  feedback for this user
router.get('/feedback/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    if (user_id !== null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const rates = await Rate.find({'rated_id': user_id})
            res.status(200).json({
                rates: rates
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    } else {
        res.status(400).json({
            message: "invalid user id"
        })
    }
})

router.get('/profile/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    if (user_id !== null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            // user details
            const user = await User.findById(user_id)
            // jobs the user has posted
            const user_jobs = await Job.aggregate([
                {
                    $match: {
                        'posted_by_id': new mongoose.Types.ObjectId(user_id),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "posted_by_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ])

            // jobs the had been accepted for
            const accepted_jobs = await Job.aggregate([
                {
                    $match: {
                        'accepted_user_id': new mongoose.Types.ObjectId(user_id),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "posted_by_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ])
            // rates for the user
            const rates = await Rate.find({'rated_id': user_id})

            const pending_offers = await Offer.aggregate([
                {
                    $match: {
                        'applicant_id': new mongoose.Types.ObjectId(user_id),
                        'status': 'pending',
                    },
                },
                {
                    $lookup: {
                        from: "job_posts",
                        localField: "job_post_id",
                        foreignField: "_id",
                        as: "job",
                    },
                },
                {
                    $unwind: {
                        path: "$job",
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ])

            res.status(200).json({
                user: user,
                user_jobs: user_jobs,
                accepted_jobs: accepted_jobs,
                rates: rates,
                pending_offers: pending_offers
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    } else {
        res.status(400).json({
            message: "invalid user id"
        })
    }
})
module.exports = router
