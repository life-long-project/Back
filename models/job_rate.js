const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const job_rate_Schema = new mongoose.Schema({
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
    ratedJob: {
        type: ObjectId,
        required: true
    },
}, {
    timestamps: true,
    autoIndex: true,
});

const Job_rateModel = mongoose.model('Job_rate', job_rate_Schema);
module.exports = Job_rateModel;