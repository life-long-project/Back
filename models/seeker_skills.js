const mongoose = require("mongoose")

const seeker_skills_schema = new mongoose.Schema({
        // seeker_skills attributes
        user_id: {
            type: String,
            required: true,
        },
        skill_id: {
            type: String,
            required: true,
        },
        skill_level: {
            type: Text,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("seeker_skills", seeker_skills_schema)