const Notification = require("./notification")

const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');
const User = require("./user");

const offerSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required:false,
            default: "",
        },
        applicant_id: {
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

offerSchema.pre('save', async function (next) {
    const notification = new Notification({
        action: 'offering',
        from_id: this.applicant_id,
        job_post_id: this.job_post_id
    })
    await notification.save()
    next()
})

const offer_model = mongoose.model("Offer", offerSchema);
module.exports = offer_model;
