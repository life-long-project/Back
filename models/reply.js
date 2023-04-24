const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const replySchema = new mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    autoIndex: true,
});

const replyModel = mongoose.model('Reply', replySchema);
module.exports = replyModel;