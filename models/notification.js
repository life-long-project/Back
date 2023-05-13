const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const notificationSchema = new mongoose.Schema(
    {
        action:{
            type: String,
            required: true
        },
        from_id: {
            type: ObjectId,
            required: true
        },
        for_id: {
            type: ObjectId,
            required: false
        },
        job_post_id: {
            type: ObjectId,
            required: false
        }

    },
    {
        timestamps: true,
        autoIndex: true,
    }
)

const notification_model = mongoose.model("Notification", notificationSchema);
module.exports = notification_model;

