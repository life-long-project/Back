const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const offerSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        },
        message: {
            type: String,
        },
        fromUser: {
            type: ObjectId,
            ref: 'user',
            required: true
        },
        job_post_id: {
            type: ObjectId,
            ref: 'job_post',
            required: true
        }
    },
    {
        timestamps: true,
        autoIndex: true,
    }
)

const offer_model = mongoose.model("Offer", offerSchema);
module.exports = offer_model;
