const mongoose = require("mongoose")

const user_account_schema = new mongoose.Schema({
        // user_account attributes
        type_id: {
            type: String,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            required: true,
            default: false
        },
        is_blocked: {
            type: Boolean,
            required: true,
            default: false
        },
        user_image: {
            type: Image,
            required: true,
        },
        email_notification_active: {
            type: Boolean,
            required: false,
        },
        sms_notification_active: {
            type: Boolean,
            required: false,
        },
        contact_number: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        password: {
            type: Text,
            required: true,
        },
        email: {
            type: Text,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user_account", user_account_schema)