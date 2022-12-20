const mongoose = require("mongoose")

const job_post_activity_schema = new mongoose.Schema({
        // job_post_activity attributes
        job_post_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        apply_date: {
            type: Date,
            required: true,
            default: Date.now()
        },
        is_accepted: {
            type: String,
            required: true,
            default: "pending"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("job_post_activity", job_post_activity_schema)