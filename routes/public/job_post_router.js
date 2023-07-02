const express = require("express");
const router = express.Router();
const io = require("../../socket/index");
const Job_post = require("../../models/job_post");
const mongoose = require("mongoose");
const {isValidObjectId} = require("mongoose");
const passport = require("passport");
const upload = require("../../multer");
const {uploadImage} = require("../../cloudinary");


const {
    validate_job_post_create,
    job_post_validation,
    validate_job_post_update,
} = require("../../middlewares/validation/job_post");
const {cities, cities_with_code, code_with_cities} = require("../../cities");
/*
options / route


sort
filter-skills
cities


 */


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

        const sort = [
            "title",
            "description",
            "skills",
            "type",
            "location",
            "salary",
            "duration"
        ]

        res.status(200).json({
            "skills-filters": skills_arr,
            "sort": sort,
            cities
        });
    } catch (e) {
        res.status(404).json("not found " + e.message);
    }
})


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

        let sortBy = {};
        if (sort[1] && sort[1].toLowerCase() === "asc") {
            sortBy[sort[0]] = 1;
        } else {
            sortBy[sort[0]] = -1;
        }

        const jobs = await Job_post.aggregate([
            {
                $match: {
                    is_hidden: {
                        $ne: true,
                    },
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
            {
                $match: {
                    job_skills: {
                        $in: [...skills],
                    },
                },
            },
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
                    job_description: 1,
                    job_skills: 1,
                    job_type: 1,
                    job_location: 1,
                    is_active: 1,
                    is_hidden: 1,
                    salary: 1,
                    job_duration: 1,
                    job_img_url: 1,
                    rating: 1,
                    total_Nrating: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: "$user",
                },
            },
        ]);
        const len_all_jobs = await Job_post.aggregate([
            {
                $match: {
                    is_hidden: {
                        $ne: true,
                    },
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
            {
                $match: {
                    job_skills: {
                        $in: [...skills],
                    },
                },
            }
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

//create new job post


router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    upload,
    async (req, res) => {
        let responses = [];
        let f_response = [];

        const files = req.files;
        // console.log(req.body, files);

        try {
            for (const file of files) {
                const result = await uploadImage(file);
                responses.push(result);
            }

            responses.forEach((resp) => {
                f_response.push(resp.secure_url);
            });

            const job = new Job_post({
                posted_by_id: mongoose.Types.ObjectId(req.user._id || "641b0c2e95e465087359ee93"),
                job_name: req.body.title || "",
                job_description: req.body.description || "",
                job_skills: req.body.skills || [],
                job_type: req.body.type || "Full-time",
                job_location: req.body.location || "Cairo",
                required_experience: req.body.required_experience || "Any Experience",
                // is_active: req.body.is_active,
                // is_hidden: req.body.is_hidden,
                salary: req.body.salary || "1000",
                job_duration: req.duration || "0",
                job_img_url: f_response || [],
            });


            const new_job_post = await job.save();
            console.log(f_response);

            res.status(201).json({
                _id: new_job_post._id,
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
    validate_job_post_update,
    job_post_validation,
    passport.authenticate('jwt', {session: false}),
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
        if (req.body.duration != null) {
            res.job_post.job_duration = req.body.duration;
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

            }catch (e){
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

router.delete("/:id",
    passport.authenticate('jwt', {session: false}),
    get_job_post, async (req, res) => {
        try {
            await res.job_post.remove();
            res.status(200).json({message: "job post is deleted"});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    });

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
                        is_hidden: {
                            $ne: true,
                        },
                    },
                },
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(job_id),
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
                    $project: {
                        _id: 1,
                        job_name: 1,
                        job_description: 1,
                        job_skills: 1,
                        job_type: 1,
                        job_location: 1,
                        is_active: 1,
                        is_hidden: 1,
                        salary: 1,
                        job_duration: 1,
                        job_img_url: 1,
                        rating: 1,
                        total_Nrating: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        user: "$user",
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
                {
                    $lookup: {
                        from: "offers",
                        localField: "_id",
                        foreignField: "job_post_id",
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


module.exports = router;
