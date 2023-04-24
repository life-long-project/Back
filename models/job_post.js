const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const job_post_schema = new mongoose.Schema(
    {
        // job_location attributes
        posted_by_id: {
            type: ObjectId,
            ref: 'user',
            required: true,
        },
        job_name: {
            type: String,
            required: true,
            default: "test",
        },
        job_description: {
            type: String,
            required: true,
            default: "this is a test description, don't judge, um just fake one.",
        },
        job_skills: {
            type: [String],
            required: true,
            default: ["javascript", "angular", "react"],
        },
        job_type: {
            type: String,
            required: true,
            default: "full-time",
        },
        job_location: {
            type: String,
            required: true,
            default: "test",
        },
        is_active: {
            type: Boolean,
            required: false,
            default: true,
        },
        is_hidden: {
            type: Boolean,
            required: false,
            default: false,
        },
        salary: {
            type: String,
            required: true,
            default: "1000",
        },
        job_duration: {
            type: String,
            required: true,
            default: "1",
        },

        //todo: don't forget handle the size of images max < 16MB when upload it to our cloud or server
        //todo: we can use CDN (s3 aws, cloudnary) after some developing
        job_img_url: {
            type: String,
            required: true,
            default:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        },

    },
    {
        timestamps: true,
        autoIndex: true,
    }
);
job_post_schema.index({job_name: 'text', job_description: 'text'})
job_post_schema.index({posted_by_id: 1});

const job_post_model = mongoose.model("job_post", job_post_schema);
module.exports = job_post_model;

/* get job_post
    then get from comments using same job_id
    then make lookup with comments and replys
 */



