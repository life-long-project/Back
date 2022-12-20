const mongoose = require("mongoose")

const user_log_schema = new mongoose.Schema({
        // user_log attributes
        user_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user_log", user_log_schema)