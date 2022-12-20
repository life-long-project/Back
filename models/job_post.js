const mongoose = require("mongoose")

const job_post_schema = new mongoose.Schema({
        // job_location attributes
        posted_by_id: {
            type: String,
            required: true,
        },
        job_type_id: {
            type: String,
            required: true,
        },
        job_description: {
            type: String,
            required: true,
            // index:true
        },
        job_location_id: {
            type: String,
            required: true,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true
        },
        is_hidden: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true,
        autoIndex:true
    }
)
job_post_schema.index({job_description:'text'})
const job_post_model = mongoose.model("job_post", job_post_schema)
job_post_model.createIndexes()
module.exports = job_post_model