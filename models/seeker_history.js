const mongoose = require("mongoose")

const seeker_history_schema = new mongoose.Schema({
        // seeker_history attributes
        job_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        is_current_job: {
            type: Boolean,
            required: true,
            default: false
        },
        rate: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("seeker_history", seeker_history_schema)