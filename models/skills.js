const mongoose = require("mongoose")

const skills_schema = new mongoose.Schema({
        // skills attributes
        name: {
            type: String,
            required: true,
        },
        created_by_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("skills", skills_schema)