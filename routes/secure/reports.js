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

    if (job.length === 0) {
      res.status(400).json({ message: "No reported jobs yet" });
    } else {
      const jobsWithReportMessages = job.map((job) => {
        return {
          ...job.toObject(),
          report_messages: job.report_messages,
        };
      });

      res.status(200).json(jobsWithReportMessages);
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
      const usersWithReportMessages = users.map((user) => {
        return {
          ...user.toObject(),
          report_messages: user.report_messages,
        };
      });

      res.status(200).json(usersWithReportMessages);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//report a job
router.post("/report_job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { report_messages } = req.body;
    const { reporterId } = req.body;

    const job = await jobs.findById(id);

    if (job) {
      job.is_reported = true;
      job.save();

      // Create a new report document in your database with the job ID and message
      const report = await Report.create({
        reportedId: id,
        report_messages: report_messages,
        reporterId: reporterId,
        // Add other relevant fields like reporterId, reportedUserId, timestamp as needed
      });

      res.status(200).json({
        message: "thank you for helping us !",
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
router.post("/report_user/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the request parameters
    const { report_messages } = req.body;
    const { reporterId } = req.body; // Get the report message from the request body

    const user = await UserModel.findById(id); // Find the user based on the ID

    if (user) {
      user.is_reported = true;
      user.save();

      // Create a new report document in your database with the user ID and message
      const report = await Report.create({
        reportedId: id,
        report_messages: report_messages,
        reporterId: reporterId,
        // Add other relevant fields like reporterId, timestamp as needed
      });

      res.status(200).json({
        message: "Thank you for helping us!",
        report: report, // Include the report details in the response
      });
    } else {
      res.status(400).json({ message: "User not found or has been deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
