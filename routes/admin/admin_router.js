const Job_post = require("../../models/job_post")
// const Reported_job_post = require("../../models/reported_jobs")
const User = require("../../models/user")
// const Reported_user = require("../../models/reported_users")


const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const {isValidObjectId, ObjectId} = require("mongoose");

//check if logged User is admin
router.use((req, res, next) => {
    console.log('user who try access admin route', req.user)
    if (req.user.is_admin !== true) {
        res.status(401).json({message: "Unauthorized"})
    } else {
        next()
    }
});


router.get('/', async (req, res) => {
// get all users
    const users = await User.find();
// get all jobs
    const job_posts = await Job_post.find();
// get reported users
    const reported_users = await User.find({'is_reported': true})
// get reported jobs
    const reported_job_posts = await Job_post.find({'is_reported': true})

// todo: recently activities
    res.status(200).json({users, reported_users, job_posts, reported_job_posts})
});

// todo: control users
// upgrade, downgrade, block, unblock, delete


// reported users
// block, cancel report
router.post('/user/:action/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    const action = req.params.action.toLowerCase()
    if (user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            switch (action) {
                case 'upgrade':
                    await User.findByIdAndUpdate(user_id, {is_admin: true})
                    res.status(200).json({message: "User is upgraded"})
                    break;
                case 'downgrade':
                    await User.findByIdAndUpdate(user_id, {is_admin: false})
                    res.status(200).json({message: "User is downgraded"})
                    break;
                case 'block':
                    await User.findByIdAndUpdate(user_id, {is_blocked: true})
                    res.status(200).json({message: "User is blocked"})
                    break;
                case 'unblock':
                    await User.findByIdAndUpdate(user_id, {is_blocked: false})
                    res.status(200).json({message: "User is unblocked"})
                    break;
                case 'delete':
                    // just hidden & block & downgrade the user
                    await User.findByIdAndUpdate(user_id, {
                        "$set": {
                            is_hidden: true,
                            is_blocked: true,
                            is_admin: false
                        }
                    })
                    res.status(200).json({message: "User is deleted"})
                    break;
                case 'verify':
                    await User.findByIdAndUpdate(user_id, {is_verified: true})
                    res.status(200).json({message: "User is verified"})
                    break;
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})

// todo: control jobs

// delete
router.post('/job/:action/:job_id', async (req, res) => {
    const job_id = req.params.job_id
    const action = req.params.action.toLowerCase()
    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        try {
            switch (action) {
                case 'delete':
                    // actually it's hidden the job
                    await Job_post.findByIdAndUpdate(job_id, {is_hidden: true})
                    res.status(200).json({message: "Job is deleted"})

                    break;
                case 'delete_both':
                    // actually it's hidden the job & the user
                    const job = await Job_post.findByIdAndUpdate(job_id, {is_hidden: true})
                    await User.findByIdAndUpdate(job['posted_by_id'], {
                        "$set": {
                            is_hidden: true,
                            is_blocked: true,
                            is_admin: false
                        }
                    })
                    res.status(200).json({message: "Job & user are deleted"})
                    break;
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})


module.exports = router;