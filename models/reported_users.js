const User = require("./user")
const mongoose = require("mongoose")
const {ObjectId} = require('mongodb');


const reported_users_schema = new mongoose.Schema({
        // reported_users attributes
        reported_id: {
            type: ObjectId,
            required: true,
        },
        reporter_id: {
            type: ObjectId,
            required: true,
        },
        title: {
            type: String,
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

reported_users_schema.pre('update', async function (next) {
    if (this.getUpdate().$set.status === 'blocked') {
        const user_id = this.reported_id
        User.findByIdAndUpdate(user_id, {is_blocked: true})
    }
    next()
})

module.exports = mongoose.model("reported_users", reported_users_schema)