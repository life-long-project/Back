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
    console.log('user who try access admin route',req.user)
    if (req.user.is_admin !== true) {
        res.status(401).json({message: "Unauthorized"})
    }else{
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
                // todo: delete the report for the user, the job
            }
            res.status(200).json({message: "User is " + action + "ed"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e.message})
        }
    }
})

// todo: control jobs

// delete
router.post('/job/:job_id/:action', async (req, res) => {
    const job_id = req.params.job_id
    const action = req.params.action.toLowerCase()
    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        try {
            switch (action) {

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



module.exports = router;