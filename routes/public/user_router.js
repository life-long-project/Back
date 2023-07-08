const User = require("../../models/user")
const Job = require("../../models/job_post")
const express = require('express')
const router = express.Router()
const Rate = require("../../models/user_rate")
const mongoose = require("mongoose");
const {isValidObjectId, ObjectId} = require("mongoose");

// todo: don't forget to change the authorization

router.get("/",async(req,res)=>{
    try {
       const users = await User.find();
       res.status(200).json({
           users: users
       })
   }catch (e) {
       res.status(500).json({
           message: e.message
       })
   }
})

router.get('/:user_id',async (req,res)=>{
    const user_id = req.params.user_id
    if (user_id !==null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user = await User.findById(user_id)
            res.status(200).json({
                user: user
            })
        }catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
    else{
        res.status(400).json({
            message:"invalid user id"
        })
    }
})

router.get('/jobs/:user_id',async (req,res)=>{
    const user_id = req.params.user_id
    if (user_id !==null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user_jobs = await Job.find({'posted_by_id': user_id})
            res.status(200).json({
                jobs: user_jobs
            })
        }catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
    else{
        res.status(400).json({
            message:"invalid user id"
        })
    }
})

router.get('/acquired_jobs/:user_id',async (req,res)=>{
    const user_id = req.params.user_id
    if (user_id !==null && user_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(user_id)) {
        try {
            const user_jobs = await Job.find({'accepted_user_id': user_id})
            res.status(200).json({
                jobs: user_jobs
            })
        }catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
    else{
        res.status(400).json({
            message:"invalid user id"
        })
    }
})

router.get('/feedback/:user_id',async (req, res) => {
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

module.exports = router
