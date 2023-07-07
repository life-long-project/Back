const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');
const Notification = require("./notification");

const job_post_schema = new mongoose.Schema(
    {
        // job_location attributes
        posted_by_id: {
            type: ObjectId,
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
            default: ['none'],
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
        // todo : edit readme
        required_experience: {
            type: String,
            required: false,
            default: "ALL",
            enum: ["ALL", "beginner", "intermediate", "expert"],
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
            default: "100",
        },
        job_duration: {
            type: String,
            required: false,
            default: "",
        },
        accepted_user_id: {
            type: ObjectId,
            default: null,
            required: false,
        },

        //todo: don't forget handle the size of images max < 16MB when upload it to our cloud or server
        //todo: we can use CDN (s3 aws, cloudnary) after some developing
        job_img_url: {
            type: Array,
            default: [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
            ]
        },
        rating: {
            type: Number,
            default: 0
        },
        total_Nrating: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true,
        autoIndex: true,
    }
);

job_post_schema.pre(
    'save',
    async function (next) {
        const job = this;
        let skills_arr = []
        this.job_skills.forEach((skill) => {
            skills_arr.push(skill.toUpperCase())
        })
        this.job_skills = skills_arr
        next();
    }
);

job_post_schema.pre("save", async function (next) {
    const notification = new Notification({
        action: 'creating new job',
        from_id: this.posted_by_id,
        for_admin: true,
        // todo: check if it get error
        job_post_id: this._id

    })
    await notification.save()
    next();
});


job_post_schema.index({job_name: 'text', job_description: 'text'})
job_post_schema.index({posted_by_id: 1});

const job_post_model = mongoose.model("job_post", job_post_schema);
module.exports = job_post_model;

/* get job_post
    then get from comments using same job_id
    then make lookup with comments and replys
 */



