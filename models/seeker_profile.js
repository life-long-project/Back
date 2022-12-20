const mongoose = require("mongoose")

const seeker_profile_schema = new mongoose.Schema({
    // seeker_profile attributes
    first_name: {
        type: String,
        required: true,
    },
    second_name: {
        type: String,
        required: true,
    },
    mean_rate: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    skills_id: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("seeker_profile", seeker_profile_schema)