const { Mongoose } = require("mongoose");
const UserModel = require("../../models/user");
const jobs = require("../../models/job_post");
const Report = require("../../models/report");

const router = require("express").Router();

//get all reported jobs
router.get("/reported_jobs", async (req, res) => {
  try {
    const job = await jobs.find({
      is_reported: true,
    });
    if (jobs.length === 0) {
      res.status(400).json({ message: "No jobs yet" });
    } else {
      res.status(200).json(job);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//get all reported users
router.get("/reported_users", async (req, res) => {
  try {
    const users = await UserModel.find({
      is_reported: true,
    });
    if (users.length === 0) {
      res.status(400).json({ message: "No users yet" });
    } else {
      res.status(200).json(users);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//report a job
router.post("/report_job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const job = await jobs.findById(id);
    if (job) {
      job.is_reported = true;
      job.save();

      // Create a new report document in your database with the job ID and message
      const report = await Report.create({
        jobId: job._id,
        message: message,
        // Add other relevant fields like reporterId, reportedUserId, timestamp as needed
      });

      res.status(200).json({
        message: "Job reported successfully",
        report: report, // Include the report details in the response
      });
    } else {
      res.status(400).json({ message: "Job not found or has been deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//report a user
router.post("report_user/:id", async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await UserModel.findById(user_id);
    if (user) {
      user.is_reported = true;
      user.save();
      res.status(200).json({ message: "thank you for helping us !" });
    } else {
      res.status(400).json({ message: "User not found or has been deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
