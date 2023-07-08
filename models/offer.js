const Notification = require("./notification")
// todo:when enter job post page check if the user is the owner then request this join with the users
const Offer = require("./offer")
const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');
const User = require("./user");
const Job_post = require("./job_post")

const offerSchema = new mongoose.Schema({
    job_post_id: {
        type: ObjectId,
        required: true
    }, applicant_id: {
        type: ObjectId,
        required: true
    }, price: {
        type: String,
        required: true
    }, message: {
        type: String,
        default: "",
    }, status: {
        type: String,
        required: true,
        default: "pending"
    },
    /* what status here for "status"
              pending,
              accepted,
              rejected
      */
    is_done: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
    autoIndex: true,
})

// notify for providing offer
offerSchema.pre('save', async function (next) {
    const job_post = await Job_post.findById(this.job_post_id)

    const notification = new Notification({
        action: 'offering',
        from_id: this.applicant_id,
        for_id: job_post['posted_by_id'],
        job_post_id: this.job_post_id
    })
    await notification.save()
    next()
})




const offer_model = mongoose.model("Offer", offerSchema);
module.exports = offer_model;
