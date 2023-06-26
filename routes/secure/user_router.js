const User = require("../../models/user")
const express = require('express')
const router = express.Router()

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





module.exports = router
