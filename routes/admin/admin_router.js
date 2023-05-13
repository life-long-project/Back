const Job_post = require("../../models/job_post")
const Reported_job_post = require("../../models/reported_jobs")
const User = require("../../models/user")
const Reported_user = require("../../models/reported_users")


const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const {isValidObjectId, ObjectId} = require("mongoose");

//check if logged User is admin
router.use((req, res, next) => {
    if (req.user.is_admin !== true) {
        console.log(req.user.is_admin)
        res.status(401).json({message: "Unauthorized"})
    }
    next()
});

router.get('/', async (req, res) => {
// get all users
    const users = await User.find();
// get all jobs
    const job_posts = await Job_post.find();
// get reported users
    const reported_users = await Reported_user.aggregate(
        [
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'reported_id',
                    'foreignField': '_id',
                    'as': 'reported'
                }
            }, {
            '$lookup': {
                'from': 'users',
                'localField': 'reporter_id',
                'foreignField': '_id',
                'as': 'reporter'
            }
        }, {
            '$unwind': {
                'path': '$reported'
            }
        }, {
            '$unwind': {
                'path': '$reporter'
            }
        }
        ]
    )
// get reported jobs
    const reported_job_posts = await Reported_job_post.aggregate(
        [
            {
                '$lookup': {
                    'from': 'job_posts',
                    'localField': 'job_post_id',
                    'foreignField': '_id',
                    'as': 'job_post'
                }
            }, {
            '$lookup': {
                'from': 'users',
                'localField': 'reporter_id',
                'foreignField': '_id',
                'as': 'reporter'
            }
        }, {
            '$unwind': {
                'path': '$job_post'
            }
        }, {
            '$unwind': {
                'path': '$reporter'
            }
        }
        ]
    )

// todo: recently activities

    res.status(200).json({users, reported_users, job_posts, reported_job_posts})
});

// todo: control users
router.post('/user/:user_id/:action', async (req, res) => {
    const user_id = req.params.user_id
    const action = req.params.action.toLowerCase()
    if (user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            switch (action) {
                case 'upgrade':
                    await User.findByIdAndUpdate(user_id, {is_admin: true})
                    break;
                case 'downgrade':
                    await User.findByIdAndUpdate(user_id, {is_admin: false})
                    break;
                case 'block':
                    await User.findByIdAndUpdate(user_id, {is_blocked: true})
                    break;
                case 'unblock':
                    await User.findByIdAndUpdate(user_id, {is_blocked: false})
                    break;
                case 'delete':
                    await User.findByIdAndDelete(user_id)
                    break;
            }
            res.status(200).json({message: "User is " + action + "ed"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})
// todo: verify & unverify users
// todo: list verified users
// todo: list verifing request and make them


// todo: control jobs
router.post('/job/:job_id/:action', async (req, res) => {
    const job_id = req.params.job_id
    const action = req.params.action.toLowerCase()
    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        try {
            switch (action) {
                // case 'block':
                //
                //     break;
                case 'delete':
                    await Job_post.findByIdAndDelete(job_id)
                    break;
            }
            res.status(200).json({message: "Job is " + action + "d"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})


// todo: control reported users
router.post('/reported_user/:reported_user_request_id/:action', async (req, res) => {
    const reported_user_request_id = req.params.reported_user_request_id
    const action = req.params.action.toLowerCase()
    if (reported_user_request_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(reported_user_request_id)) {
        try {
            switch (action) {
                // case 'block':
                //
                //     break;
                case 'block':
                    await Reported_user.findByIdAndUpdate(reported_user_request_id, {status: "blocked"})
                    break;
            }
            res.status(200).json({message: "User is " + action + "ed"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})

// todo: control reported jobs
router.post('/reported_job/:reported_job_request_id/:action', async (req, res) => {
    const reported_job_request_id = req.params.reported_job_request_id
    const action = req.params.action.toLowerCase()
    if (reported_job_request_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(reported_job_request_id)) {
        try {
            switch (action) {
                // case 'block':
                //
                //     break;
                case 'hide':
                    await Reported_job_post.findByIdAndUpdate(reported_job_request_id, {status: "hided"})
                    break;
            }
            res.status(200).json({message: "Job is " + action + ",User is blocked."})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})

module.exports = router;