const express = require('express')
const router = express.Router()
const Job_post = require("../models/job_post")
const {isValidObjectId} = require("mongoose");

// const multer = require('multer')

// const upload = multer({
//     dest: '../uploads/',
//     // todo: adding some limits to files
//     limits: {
//         fieldSize : 16e6, // 16MB
//         files:1,
//
//     }
// })

// router.post('/img', upload.single('job_img'), (req, res) => {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body)
//     res.send(req.file)
//
// })

//todo: don't forget to make an index in your collection to search for a word


//getting all data for home page or search with ?q=query
router.get('/', async (req, res) => {
    console.log(req.query.q)

    if (req.query.q != null) {
        //search for a word in description or title
        try {
            const jobs = await Job_post.find({
                $text: {
                    $search: req.query.q
                }
            })
            res.json(jobs)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    } else {
        try {
            const jobs = await Job_post.find()
            res.json(jobs)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

})


//create new job post
router.post('/', async (req, res) => {
    const job = new Job_post({
        posted_by_id: req.body.posted_by_id,
        job_type_id: req.body.job_type_id,
        job_description: req.body.job_description,
        job_location_id: req.body.job_location_id,
        // for testing not db
        job_name: req.job_name,
        publisher: req.publisher,
        job_type: req.job_type,
        salary: req.salary,
        job_img_url: req.job_img_url,
    })
    try {
        const new_job_post = await job.save()
        res.status(201).json(new_job_post)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//getting one job
router.get("/:id", get_job_post, (req, res) => {
    res.json(res.job_post)
})

// updating one job
router.patch('/:id', get_job_post, async (req, res) => {
    if (req.body.job_type_id != null) {
        res.job_post.job_type_id = req.body.job_type_id
    }
    if (req.body.job_description != null) {
        res.job_post.job_description = req.body.job_description

    }
    if (req.body.job_location_id != null) {
        res.job_post.job_location_id = req.body.job_location_id

    }
    if (req.body.is_active != null) {
        res.job_post.is_active = req.body.is_active

    }
    if (req.body.is_hidden != null) {
        res.job_post.is_hidden = req.body.is_hidden
    }
    // for testing not db
    if (req.body.job_name != null) {
        res.job_post.job_name = req.body.job_name
    }
    if (req.body.publisher != null) {
        res.job_post.publisher = req.body.publisher
    }
    if (req.body.job_type != null) {
        res.job_post.job_type = req.body.job_type
    }
    if (req.body.salary != null) {
        res.job_post.salary = req.body.salary
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

// todo : will remove delete function and just make update with is_hidden value is true

// deleting one
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
}

module.exports = router