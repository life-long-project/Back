const express = require("express");
const router = express.Router();
const io = require("../../socket/index");
const Job_post = require("../../models/job_post");
const mongoose = require("mongoose");
const {isValidObjectId} = require("mongoose");
const passport = require("passport");
const upload = require("../../multer");
const {uploadImage} = require("../../cloudinary");
const Activity = require("../../models/activity_log");

const {
    validate_job_post_create,
    job_post_validation,
    validate_job_post_update,
} = require("../../middlewares/validation/job_post");
const {cities, cities_with_code, code_with_cities} = require("../../cities");
const User = require("../../models/user");

// options / route

router.get("/options", async (req, res) => {
    try {
        const skills_db = await Job_post.aggregate([
            {$unwind: "$job_skills"},
            {
                $group: {
                    _id: "$job_skills",
                    count: {$sum: 1},
                },
            },
            {
                $sort: {count: -1},
            },
        ]).exec();
        let skills_arr = [];
        skills_db.forEach((skill) => {
            skills_arr.push(skill._id);
        });
        if (skills_arr.length === 0) {
            skills_arr = [""];
        }

        let job_types = ['full-time', 'part-time', 'service']


        const sort = [
            "salary",
            "updatedAt",
            "job_duration",
            // "is_active",
        ];

        res.status(200).json({
            skills: skills_arr,
            sort: sort,
            job_types: job_types,
            cities: cities
        });
    } catch (e) {
        res.status(404).json("not found " + e.message);
    }
});

router.get("/skills", async (req, res) => {
    try {
        const skills_db = await Job_post.aggregate([
            {$unwind: "$job_skills"},
            {
                $group: {
                    _id: "$job_skills",
                    count: {$sum: 1},
                },
            },
            {
                $sort: {count: -1},
            },
        ]).exec();
        let skills_arr = [];
        skills_db.forEach((skill) => {
            skills_arr.push(skill._id);
        });
        if (skills_arr.length === 0) {
            skills_arr = [""];
        }
        // console.log(skills_arr);
        res.status(200).json(skills_arr);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

//getting all data for home page or search with ?q=query
router.get("/", async (req, res) => {
    try {
        // getting skills from job_post collection
        const skills_db = await Job_post.aggregate([
            {$unwind: "$job_skills"},
            {
                $group: {
                    _id: "$job_skills",
                    count: {$sum: 1},
                },
            },
            {
                $sort: {count: -1},
            },
        ]).exec();
        // console.log(skills_db);

        let skills_arr = [];
        skills_db.forEach((skill) => {
            skills_arr.push(skill._id);
        });
        if (skills_arr.length === 0) {
            skills_arr = [""];
        }

        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        let sort = req.query.sort || "createdAt";
        let skills = req.query.skills || "ALL";

        skills === "ALL"
            ? (skills = [...skills_arr])
            : (skills = req.query.skills.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        // console.log(skills);

        let sortBy = {};
        if (sort[1] && sort[1].toLowerCase() === "asc") {
            sortBy[sort[0]] = 1;
        } else {
            sortBy[sort[0]] = -1;
        }

        let job_types = ['full-time', 'part-time', 'service'];
        let job_type = req.query.job_type || 'ALL';

        job_type === 'ALL'
            ? (job_type = [...job_types])
            : (job_type = req.query.job_type.split(','));


        let city = req.query.city || 'ALL';
        city === 'ALL'
            ? (city = [...cities])
            : (city = req.query.city.split(','));


        const jobs = await Job_post.aggregate([
            {
                $match: {
                    is_hidden: false,
                },
            },
            {
                $match: {
                    $and: [
                        {is_active: true},
                        {is_finished: false},
                    ],
                },
            },
            {
                $match: {
                    is_reported: false,
                },
            },
            {
                $match: {
                    $or: [
                        {
                            job_name: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                        {
                            job_description: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                    ],
                },
            },
            // filter for job_type
            {
                $match: {
                    job_type: {
                        $in: [...job_type],
                    },
                },
            },
            // filter for location
            {
                $match: {
                    job_location: {
                        $in: [...city],
                    },
                },
            },
            //
            {
                $match: {
                    job_skills: {
                        $in: [...skills],
                    },
                },
            },


            //
            {
                $sort: sortBy,
            },
            {
                $skip: page * limit,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "posted_by_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    job_name: 1,
                    posted_by_id: 1,
                    job_description: 1,
                    job_skills: 1,
                    job_type: 1,
                    job_location: 1,
                    required_experience: 1,
                    is_active: 1,
                    is_hidden: 1,
                    salary: 1,
                    job_duration: 1,
                    job_img_url: 1,
                    rating: 1,
                    total_Nrating: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: 1,
                    is_finished: 1,
                    is_reported: 1,
                },
            },
        ]);
        const len_all_jobs = await Job_post.aggregate([
            {
                $match: {
                    is_hidden: false,
                },
            },
            {
                $match: {
                    $and: [
                        {is_active: true},
                        {is_finished: false},
                    ],
                },
            },
            {
                $match: {
                    $or: [
                        {
                            job_name: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                        {
                            job_description: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                    ],
                },
            },
            // filter for job_type
            {
                $match: {
                    job_type: {
                        $in: [...job_type],
                    },
                },
            },
            // filter for location
            {
                $match: {
                    job_location: {
                        $in: [...city],
                    },
                },
            },
            //
            {
                $match: {
                    job_skills: {
                        $in: [...skills],
                    },
                },
            },
        ]);
        const response = {
            error: false,
            search,
            page: page + 1,
            limit,
            total: Object(len_all_jobs).length,
            skills,
            jobs,
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

// random jobs
router.get('/related', async (req, res) => {
    const total = await Job_post.countDocuments();
    let skip = 0
    let randomDoc = await Job_post.find({}).skip(skip).limit(5).exec();
    while (total > 5 && skip < 5) {
        skip = Math.floor(Math.random() * total) + 1;
        randomDoc = await Job_post.find({}).skip(skip).limit(5).exec();
    }
    console.log(total, Object(randomDoc).length)
    res.json(randomDoc)
})

//create new job post

router.post(
    "/",
    passport.authenticate("jwt", {session: false}),
    upload,
    validate_job_post_create,
    job_post_validation,
    async (req, res) => {
        let responses = [];
        let f_response = [];

        const files = req.files;
        // console.log(req.body, files);

        try {
            if (files && files.length > 0) {
                for (const file of files) {
                    const result = await uploadImage(file);
                    f_response.push(result.secure_url);
                }
            }
            let req_skills;
            // console.log(req.body.skills)
            req_skills = (typeof (req.body.skills) === "string") ? (JSON.parse(req.body.skills)) : (req.body.skills)
            const job = new Job_post({
                posted_by_id: mongoose.Types.ObjectId(
                    req.user._id || "641b0c2e95e465087359ee93"
                ),
                job_name: req.body.title || "",
                job_description: req.body.description || "",
                job_skills: req_skills || [""],
                job_type: req.body.type || "full-time",
                job_location: (req.body.location || "Cairo").toLowerCase(),
                required_experience: req.body.required_experience || "ALL",
                // is_active: req.body.is_active,
                // is_hidden: req.body.is_hidden,
                salary: req.body.salary || "1000",
                job_duration: req.duration || "0",
                job_img_url: f_response || [],
            });

            const new_job_post = await job.save();
            console.log(f_response);
            console.log(req.user._id);
            const user = await User.findById(req.user._id);
            // console.log(user)
            await Activity.create({
                activity_message: "Job is created",
                posted_by_id: new_job_post.posted_by_id,
                category: 'job',
                for_id: new_job_post._id
            })

            res.status(201).json({
                _id: new_job_post._id,
                posted_by_id: new_job_post.posted_by_id,
                title: new_job_post.job_name,
                description: new_job_post.job_description,
                skills: new_job_post.job_skills,
                type: new_job_post.job_type,
                location: new_job_post.job_location,
                required_experience: new_job_post.required_experience,
                salary: new_job_post.salary,
                duration: new_job_post.job_duration,
                job_img_url: new_job_post.job_img_url,
                is_active: new_job_post.is_active,
                is_hidden: new_job_post.is_hidden,
                createdAt: new_job_post.createdAt,
                updatedAt: new_job_post.updatedAt,
                is_finished: new_job_post.is_finished,
                is_reported: new_job_post.is_reported,
                user: user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
);

// updating one job

// todo: check if update work correctly on postman
router.patch(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    upload,
    validate_job_post_update,
    job_post_validation,
    get_job_post,
    async (req, res) => {
        if (req.body.title != null) {
            res.job_post.job_name = req.body.title;
        }
        if (req.body.description != null) {
            res.job_post.job_description = req.body.description;
        }
        if (req.body.skills != null) {
            res.job_post.job_skills = req.body.skills;
        }
        if (req.body.type != null) {
            res.job_post.job_type = req.body.type;
        }
        if (req.body.location != null) {
            res.job_post.job_location = req.body.location;
        }
        if (req.body.is_active != null) {
            res.job_post.is_active = req.body.is_active;
        }
        if (req.body.is_hidden != null) {
            res.job_post.is_hidden = req.body.is_hidden;
        }
        if (req.body.salary != null) {
            res.job_post.salary = req.body.salary;
        }
        if (req.body.is_finished != null) {
            res.job_post.is_finished = req.body.is_finished;
        }
        if (req.body.duration != null) {
            res.job_post.job_duration = req.body.duration;
        }
        if (req.body.is_reported != null) {
            res.job_post.is_reported = req.body.duration;
        }
        if (req.files != null) {
            // console.log(req.body, files);

            try {
                let responses = [];
                let f_response = [];
                const files = req.files;

                for (const file of files) {
                    const result = await uploadImage(file);
                    responses.push(result);
                }

                responses.forEach((resp) => {
                    f_response.push(resp.secure_url);
                });
                res.job_post.job_img_url = f_response;
            } catch (e) {
                console.log(e);
                res.status(400).json({message: e.message});
            }
        }
        try {
            const updated_jop_post = await res.job_post.save();
            io.getIO().emit("job_post_updated", {
                action: "updated",
                updated_jop_post,
            });
            await Activity.create({
                activity_message: "Job is updated",
                posted_by_id: updated_jop_post.posted_by_id,
                category: 'job',
                for_id: updated_jop_post._id
            })
            res.status(201).json({
                _id: updated_jop_post._id,
                title: updated_jop_post.job_name,
                description: updated_jop_post.job_description,
                skills: updated_jop_post.job_skills,
                type: updated_jop_post.job_type,
                location: updated_jop_post.job_location,
                required_experience: updated_jop_post.required_experience,
                salary: updated_jop_post.salary,
                duration: updated_jop_post.job_duration,
                job_img_url: updated_jop_post.job_img_url,
                is_hidden: updated_jop_post.is_hidden,
                is_active: updated_jop_post.is_active,
                createdAt: updated_jop_post.createdAt,
                updatedAt: updated_jop_post.updatedAt,
                is_finished: updated_jop_post.is_finished,
            });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
);

//getting one job
router.get("/:id", get_job_post_details, (req, res) => {
    res.json(res.job_post);
});

// deleting one
// todo : will remove delete function and just make update with is_hidden value is true

router.delete(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    get_job_post,
    async (req, res) => {
        try {
            await res.job_post.updateOne({is_hidden: true});
            await Activity.create({
                activity_message: "Job is deleted",
                posted_by_id: res.job_post.posted_by_id,
                category: 'job',
                for_id: res.job_post._id
            })
            res.status(200).json({message: "job post is deleted"});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
);

// function as middlewares to get job using id to use all object again
async function get_job_post(req, res, next) {
    const job_id = req.params.id;
    console.log(isValidObjectId(job_id), job_id);

    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        let job_post;
        try {
            job_post = await Job_post.findById(req.params.id);

            if (job_post == null) {
                return res
                    .status(404)
                    .json({message: "cannot found job post using this id"});
            }
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
        res.job_post = job_post;
        next();
    } else {
        return res.status(400).json({message: "invalid job id"});
    }
}

async function get_job_post_details(req, res, next) {
    const job_id = req.params.id;
    console.log(isValidObjectId(job_id), job_id);

    if (job_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(job_id)) {
        let job_post;

        try {
            job_post = await Job_post.aggregate([
                // Match job post
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(job_id),
                    },
                },
                {
                    $project: {
                        _id: 1,
                        posted_by_id: 1,
                        job_name: 1,
                        job_description: 1,
                        job_skills: 1,
                        job_type: 1,
                        job_location: 1,
                        required_experience: 1,
                        is_active: 1,
                        is_hidden: 1,
                        is_reported: 1,
                        salary: 1,
                        job_duration: 1,
                        report_messages: 1,
                        accepted_user_id: 1,
                        job_img_url: 1,
                        rating: 1,
                        total_Nrating: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        user: 1,
                        is_finished: 1,
                        is_reported: 1,
                    },
                },
                // Join with users collection
                {
                    $lookup: {
                        from: "users",
                        localField: "posted_by_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "job_id",
                        as: "comments",
                    },
                },
                //
                {
                    $lookup: {
                        from: "offers",
                        let: {job_id: "$_id"},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ["$job_post_id", "$$job_id"]},
                                },
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "applicant_id",
                                    foreignField: "_id",
                                    as: "owner",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$owner",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                        ],
                        as: "offers",
                    },
                },

            ]);
            if (job_post == null) {
                return res
                    .status(404)
                    .json({message: "cannot found job post using this id"});
            }
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
        res.job_post = job_post;
        next();
    } else {
        return res.status(400).json({message: "invalid job id"});
    }
}

router.post("/update_status/:id", get_job_post, async (req, res) => {
    res.job_post.is_finished = req.body.is_finished;
    try {
        const updated_jop_post = await res.job_post.save();
        await Activity.create({
            activity_message: "Job is finished",
            posted_by_id: updated_jop_post['accepted_user_id'],
            category: 'job',
            for_id: updated_jop_post._id
        })

        const owner = await User.findById(res.job_post.posted_by_id)
        const employee = await User.findById(res.job_post.accepted_user_id)

        const salary = parseInt(res.job_post.salary)

        const owner_wallet = parseInt(owner.wallet) - salary
        const owner_total_payments = parseInt(owner.total_payments) + salary

        const employee_wallet = parseInt(employee.wallet) + salary
        const employee_total_earning = parseInt(employee.wallet) + salary

        // owner
        await User.findByIdAndUpdate(res.job_post.posted_by_id, {
            $set: {
                wallet: parseInt(owner_wallet),
                total_payments: parseInt(owner_total_payments)
            }
        })
        // employee
        await User.findByIdAndUpdate(res.job_post.accepted_user_id, {
            $set: {
                wallet: parseInt(employee_wallet),
                total_earning: parseInt(employee_total_earning)
            }
        })

        res.status(201).json({
            message: "the job is now finished",
            is_finished: updated_jop_post.is_finished,
        });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
