const User_rate = require('../../models/user_rate');
const {validate_rate,rate_validation} = require('../../middlewares/validation/rate')
const Job = require('../../models/job_post');

const express = require('express')
const router = express.Router()

// rating from worker for the job and the owner
router.post('/job/:job_id',
    validate_rate,
    rate_validation,
    async (req, res) => {
        try {
            // worker
            const rater_id = req.user._id || '6463b901b377ff4bae1c9c1a'
            const rated_job_id = req.params.job_id
            const job = await Job.findById(rated_job_id)
            // owner
            const rated_id = job['posted_by_id']
            const rating = req.body.rating || 5
            const feedback = req.body.feedback || ""

            const old_rate = await User_rate.findOne({
                "rater_id": rater_id,
                "rated_id":rated_id,
                "rated_job_id":rated_job_id
            })
            if(old_rate){
                res.status(400).json({message: "Already rated"})
            }else{
                const rate = new User_rate({
                    rater_id,
                    rated_job_id,
                    rated_id,
                    rating,
                    feedback
                })
                console.log(rate)
                await rate.save();
                res.status(201).json({message: "Success"})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }

    })

// rating from owner for the user

router.post('/user/:job_id',
    validate_rate,
    rate_validation,
    async (req, res) => {
        try {
            // owner
            const rater_id = req.user._id || '6463b901b377ff4bae1c9c1a'
            const rated_job_id = req.params.job_id
            const job = await Job.findById(rated_job_id)
            // worker
            const rated_id = job['accepted_user_id']
            const rating = req.body.rating || 5
            const feedback = req.body.feedback || ""

            const old_rate = await User_rate.findOne({
                "rater_id": rater_id,
                "rated_id":rated_id,
                "rated_job_id":rated_job_id
            })
            if(old_rate){
                res.status(400).json({message: "Already rated"})
            }else{
                const rate = new User_rate({
                    rater_id,
                    rated_job_id,
                    rated_id,
                    rating,
                    feedback
                })
                console.log(rate)
                await rate.save();
                res.status(201).json({message: "Success"})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }

    })

/*
todo: finish request then route to rating pages
 */

module.exports = router