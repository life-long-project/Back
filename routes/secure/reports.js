const {Mongoose} = require("mongoose");
const UserModel = require("../../models/user");
const jobs = require("../../models/job_post");
const Report = require("../../models/report");
const passport = require("passport");
const Activity = require("../../models/activity_log");


const router = require("express").Router();

//get all reported jobs
router.get("/reported_jobs", async (req, res) => {
    try {
        const job = await jobs.find({
            is_reported: true,
        });

        if (!job) {
            res.status(400).json({message: "No reported jobs yet"});
        } else {
            const jobsWithReportMessages = job.map((job) => {
                return {
                    ...job.toObject(),
                    report_messages: job.report_messages,
                };
            });
            console.log(jobsWithReportMessages)
            res.status(200).json(jobsWithReportMessages);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

//get all reported users
router.get("/reported_users", async (req, res) => {
    try {
        const users = await UserModel.find({
            is_reported: true,
        });

        if (!users) {
            res.status(400).json({message: "No users yet"});
        } else {
            const usersWithReportMessages = users.map((user) => {
                return {
                    ...user.toObject(),
                    report_messages: user.report_messages,
                };
            });

            res.status(200).json(usersWithReportMessages);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

//report a job
router.post("/report_job/:id",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {id} = req.params;
            const {report_messages} = req.body;
            const {reporterId} = req.user._id;

            const job = await jobs.findById(id);

            if (job) {
                job.is_reported = true;
                job.report_messages = report_messages
                job.save();

                await Activity.create({
                    activity_message: "Job is reported",
                    posted_by_id: req.user._id,
                    category: 'job',
                    for_id: job['_id']
                })

                res.status(200).json({
                    message: "thank you for helping us !",
                    report: report_messages, // Include the report details in the response
                });
            } else {
                res.status(400).json({message: "Job not found or has been deleted"});
            }
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    });

//report a user
router.post("/report_user/:id",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {id} = req.params; // Get the user ID from the request parameters
            const {report_messages} = req.body;
            const {reporterId} = req.user._id; // Get the report message from the request body

            const user = await UserModel.findById(id); // Find the user based on the ID

            if (user) {
                user.is_reported = true;
                user.report_messages = report_messages
                user.save();

                await Activity.create({
                    activity_message: "user is reported",
                    posted_by_id: req.user._id,
                    category: 'user',
                    for_id: user['_id']
                })

                res.status(200).json({
                    message: "Thank you for helping us!",
                    report: report_messages, // Include the report details in the response
                });
            } else {
                res.status(400).json({message: "User not found or has been deleted"});
            }
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    });

module.exports = router;
