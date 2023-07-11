const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const activitySchema = new mongoose.Schema({
    activity_message: {
        type: String,
        required: true
    },
    posted_by_id:{
        type: ObjectId,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    for_id:{
        type: ObjectId,
        required: false
    }

}, {
    timestamps: true,
    autoIndex: true,
});

const ActivityModel = mongoose.model('Activity', activitySchema);
module.exports = ActivityModel;