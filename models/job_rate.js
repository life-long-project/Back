const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');
const User = require("./user");
const Job_post = require("./job_post");
const Notification = require("./notification")


const job_rate_Schema = new mongoose.Schema({
    rater_id: {
        type: ObjectId,
        required: true
    },
    rated_job_id: {
        type: ObjectId,
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

}, {
    timestamps: true,
    autoIndex: true,
});

job_rate_Schema.pre('save', async function (next) {
    try {
        const job_post = await Job_post.findOne(this.rated_job_id)
        const total_Nrating = (job_post.total_Nrating || 0) + 1
        const new_rating = this.rating
        const current_rating = job_post.rating || 0
        const updated_rating = (current_rating * job_post.total_Nrating + new_rating) / total_Nrating

        job_post.rating = updated_rating
        job_post.total_Nrating = total_Nrating
        await job_post.save()
        next()
    } catch (err) {
        next(err)
    }
})

job_rate_Schema.pre('save', async function (next) {
    const job_post = await Job_post.findOne(this.rated_job_id)

    const notification = new Notification({
        action: 'Rating Job',
        from_id: this.rater_id,
        for_id: job_post['posted_by_id'],
        job_post_id: this.rated_job_id,
    })
    await notification.save()
    next()
})


const Job_rateModel = mongoose.model('Job_rate', job_rate_Schema);
module.exports = Job_rateModel;