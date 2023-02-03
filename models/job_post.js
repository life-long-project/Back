const mongoose = require("mongoose")

const job_post_schema = new mongoose.Schema({
        // job_location attributes
        posted_by_id: {
            type: String,
            required: false,
                default:'3'    
        },
        job_type_id: {
            type: String,
            required: false,
                default:'3'
        },
        job_description: {
            type: String,
            required: false,
            default: "this is a test description, don't judge, um just fake one."
        },
        job_location_id: {
            type: String,
            required: false,
                default:'3'
        },
        is_active: {
            type: Boolean,
            required: false,
            default: true
        },
        is_hidden: {
            type: Boolean,
            required: false,
            default: false
        },

        // example data below not for real db just for initial testing
        job_name: {
            type: String,
            required: false,
            default: "Test job"
        },
        publisher: {
            type: String,
            required: false,
            default: "TEST PUBLISHER"

        },
        job_type: {
            type: String,
            required: false,
            default: "Full job"
        },
        salary: {
            type: String,
            required: false,
            default: "1000"
        },
        //todo: don't forget handle the size of images max < 16MB when upload it to our cloud or server
        //todo: we can use CDN (s3 aws, cloudnary) after some developing
        job_img_url: {
            type: String,
            required: false,
            default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
)
job_post_schema.index({job_description: 'text'})
const job_post_model = mongoose.model("job_post", job_post_schema)
job_post_model.createIndexes()
module.exports = job_post_model
