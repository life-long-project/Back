const express = require('express')
const router = express.Router()
const Job_post = require("../models/job_post")
const {isValidObjectId} = require("mongoose");



//getting all data for home page or search with ?q=query
router.get('/', async (req, res) => {


    try {

        // getting skills from job_post collection
        const skills_db = await Job_post.aggregate([
            {$unwind: '$job_skills'},
            {
                $group: {
                    _id: "$job_skills",
                    count: {$sum: 1},
                }
            },
            {
                $sort: { count : -1}
            }
        ]).exec()
        let skills_arr = []
        skills_db.forEach((skill) => {
            skills_arr.push(skill._id)
        })
        if (skills_arr.length === 0) {
            skills_arr = [""]
        }


        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ""
        let sort = req.query.sort || "createdAt"
        let skills = req.query.skills || "ALL"

        skills === "ALL" ? (skills = [...skills_arr]) : (skills = req.query.skills.split(","))
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = "desc"
        }


        const jobs = await Job_post.find({
            $or: [
                {job_name: {$regex: search, $options: "i"}},
                {job_description: {$regex: search, $options: "i"}}
            ]
        })
            .where("job_skills")
            .in([...skills])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)

        const total = await Job_post.countDocuments({
            $or: [
                {job_name: {$regex: search, $options: "i"}},
                {job_description: {$regex: search, $options: "i"}}
            ],
            job_skills: {$in: [...skills]},
        })

        const response = {
            error:false,
            search,
            page:page+1,
            limit,
            total,
            skills,
            jobs,
        }

        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }


})


//create new job post
router.post('/', async (req, res) => {
    const job = new Job_post({
        posted_by_id: req.body.posted_by_id,
        job_name: req.body.job_name,
        job_description: req.body.job_description,
        job_skills: req.body.job_skills,
        job_type: req.body.job_type,
        job_location: req.body.job_location,
        is_active: req.body.is_active,
        is_hidden: req.body.is_hidden,
        salary: req.body.salary,
        job_duration: req.job_duration,
    })
    try {
        const new_job_post = await job.save()
        res.status(201).json(new_job_post)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


// updating one job
router.patch('/:id', get_job_post, async (req, res) => {
    if (req.body.job_name != null) {
        res.job_post.job_name = req.body.job_name
    }
    if (req.body.job_description != null) {
        res.job_post.job_description = req.body.job_description

    }
    if (req.body.job_skills != null) {
        res.job_post.job_skills = req.body.job_skills

    }
    if (req.body.job_type != null) {
        res.job_post.job_type = req.body.job_type

    }
    if (req.body.job_location != null) {
        res.job_post.job_location = req.body.job_location
    }
    if (req.body.is_active != null) {
        res.job_post.is_active = req.body.is_active
    }
    if (req.body.is_hidden != null) {
        res.job_post.is_hidden = req.body.is_hidden
    }
    if (req.body.salary != null) {
        res.job_post.salary = req.body.salary
    }
    if (req.body.job_duration != null) {
        res.job_post.job_duration = req.body.job_duration
    }
    if (req.body.job_img_url != null) {
        res.job_post.job_img_url = req.body.job_img_url
    }
    try {
        const updated_jop_post = await res.job_post.save()
        res.status(201).json(updated_jop_post)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//getting one job
router.get("/:id", get_job_post, (req, res) => {
    res.json(res.job_post)
})

// deleting one
// todo : will remove delete function and just make update with is_hidden value is true

router.delete('/:id', get_job_post, async (req, res) => {
    try {
        await res.job_post.remove()
        res.status(200).json({message: "job post is deleted"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})


// function as middleware to get job using id to use all object again
async function get_job_post(req, res, next) {

    console.log(isValidObjectId(req.params.id), req.params.id)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(req.params.id)) {
        let job_post;
        try {
            job_post = await Job_post.findById(req.params.id)
            if (job_post == null) {
                return res.status(404).json({message: "cannot found job post using this id"})
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
        res.job_post = job_post
        next()
    } else {
        return res.status(400).json({message: "invalid job id"})
    }
}


module.exports = router