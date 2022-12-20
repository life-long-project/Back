const mongoose = require("mongoose")

const job_post_skills_schema = new mongoose.Schema({
        // job_post_skills attributes
        job_post_id: {
            type: String,
            required: true,
        },
        skill_id: {
            type: String,
            required: true,
        },
        skill_level: {
            type: String,
            required: true,
            default: "Beginner"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("job_post_skills", job_post_skills_schema)