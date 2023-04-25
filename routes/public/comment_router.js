const express = require('express')
const router = express.Router()
const Comment = require("../../models/comment")
const {isValidObjectId} = require("mongoose");
const {ObjectId} = require('mongodb');
const passport = require('passport');

// router.get('/:job_id', async (req, res) => {
//     const job_id = req.params.job_id;
//     console.log(isValidObjectId(job_id), job_id)
//     if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
//         const comments = await Comment.aggregate([
//             {
//                 '$match': {
//                     'job_id': new ObjectId(job_id)
//                 }
//             }, {
//                 '$lookup': {
//                     'from': 'job_posts',
//                     'localField': 'job_id',
//                     'foreignField': '_id',
//                     'as': 'job_post'
//                 }
//             }, {
//                 '$unwind': {
//                     'path': '$job_post'
//                 }
//             }
//         ])
//         return res.json(comments)
//     } else {
//         return res.status(400).json({message: "invalid job id"})
//     }
//
// })

//create comment
router.post('/:job_id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const job_id = req.params.job_id;

    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        const new_comment = new Comment({
            posted_by_id: new ObjectId(req.user._id),
            username: req.user.username,
            job_id: new ObjectId(job_id),
            content: req.body.content
        })
        // console.log(req.user)
        // console.log(new_comment)
        try {
            await new_comment.save()
            return res.status(201).json(new_comment)
        } catch (err) {
            res.status(400).json({message: err.message})
        }

    } else {
        return res.status(404).json({message: "invalid job id or content is empty"})
    }
})

//create reply to a comment
router.post('/:comment_id/reply', passport.authenticate('jwt', {session: false}), getComment,async (req, res) => {

    if(req.body.content != null){
        let replies = res.comment["replies"] || []
        let new_reply = Object({
            "posted_by_id": req.user._id,
            "content": req.body.content,
            "username": req.user.username,
        })
        replies.push(new_reply)
        res.comment["replies"] = replies
        try {
            await res.comment.save()
            return res.status(201).json(res.comment)
        } catch (err) {
            return res.status(500).json({message: err.message})
        }

    }
})

async function getComment(req, res, next) {
    const comment_id = req.params.comment_id;
    if (comment_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(comment_id)) {
        let comment;
        try {
            comment = await Comment.findById(comment_id)
            if (comment == null) {
                return res.status(404).json({message: "cannot found comment using this id"})
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
        res.comment = comment

        next()
    } else {
        return res.status(400).json({message: "invalid comment id"})
    }

}

module.exports = router;
