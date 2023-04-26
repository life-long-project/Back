const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const commentSchema = new mongoose.Schema({
    posted_by_id: {
        type: ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    job_id: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: [
        {
            posted_by_id: {
                type: ObjectId,
            },
            username: {
                type: String,
                required: true
            },
            content: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
}, {
    timestamps: true,
    autoIndex: true,
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;