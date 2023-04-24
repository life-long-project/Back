const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const commentSchema = new mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: [
        {
            type: ObjectId,
            ref: 'Reply'
        }
    ],
}, {
    timestamps: true,
    autoIndex: true,
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;