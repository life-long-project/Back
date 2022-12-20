const mongoose = require("mongoose")

const reported_jobs_schema = new mongoose.Schema({
        // reported_jobs attributes
        job_post_id: {
            type: String,
            required: true,
        },
        reporter_id: {
            type: String,
            required: true,
        },
        title: {
            type: Text,
            required: true,
        },
        report: {
            type: Text,
            required: true,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true
        },
        is_hidden: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("reported_jobs", reported_jobs_schema)