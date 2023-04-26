const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const user_rate_Schema = new mongoose.Schema({
    ratedBy_id: {
        type: ObjectId,
        required: true
    },
    ratedBy_username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        required: true,
        trim: true
    },
    ratedUser: {
        type: ObjectId,
        required: true
    },
}, {
    timestamps: true,
    autoIndex: true,
});

const User_rateModel = mongoose.model('User_rate', user_rate_Schema);
module.exports = User_rateModel;