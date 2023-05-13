const Job_post = require("./job_post")

const mongoose = require("mongoose")
const {ObjectId} = require('mongodb');


const reported_jobs_schema = new mongoose.Schema({
        // reported_jobs attributes
        job_post_id: {
            type: ObjectId,
            required: true,
        },
        reporter_id: {
            type: ObjectId,
            required: true,
        },
        title: {
            type: ObjectId,
            required: true,
        },
        report: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        },
    },
    {
        timestamps: true
    }
)
// pre function to update jobs and users collection after take actions with reported_jobs

reported_jobs_schema.pre('update', async function (next) {
    if (this.getUpdate().$set.status === 'hided') {
        const job_id = this.job_post_id
        Job_post.findByIdAndUpdate(job_id, {is_hidden: true})

    }
    next()
})

module.exports = mongoose.model("reported_jobs", reported_jobs_schema)