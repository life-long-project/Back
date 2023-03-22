const profile = require("../models/user_profile");
const user = require("../models/user_schema");
// const auth = require("../middleware/auth");
const JobPost = require("../models/job_post");
const ReportedJob = require("../models/reported_jobs");

// Authentication middleware to check user's role
exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin !== true) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

exports.getReportedJobPosts = async (req, res) => {
  try {
    const reportedJobs = await JobPost.aggregate([
      {
        $lookup: {
          from: "reported_jobs",
          localField: "_id",
          foreignField: "job_post_id",
          as: "report",
        },
      },
      {
        $match: {
          is_reported: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posted_by: 1,
          report: { $arrayElemAt: ["$report.report", 0] },
        },
      },
    ]);
    res.status(200).send(reportedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteReportedJobPosts = async (req, res) => {
  try {
    const jobPostId = req.params.id;
    const jobPost = await JobPost.findById(jobPostId);
    if (!jobPost) {
      return res.status(404).send({ message: "Job post not found" });
    }
    if (jobPost.is_reported) {
      await JobPost.findByIdAndDelete(jobPostId);
      return res.status(200).send({ message: "Job post deleted" });
    } else {
      return res.status(403).send({ message: "Job post cannot be deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getReportedProfiles = async (req, res) => {
  try {
    // Find all reported users
    const reportedUsers = await profile
      .find({ is_reported: true })
      .select("_id");
    // Find all reports for reported users
    const reportedUsersWithReport = await profile.aggregate([
      {
        $match: {
          user_id: { $in: reportedUsers.map((profile) => profile._id) },
        },
      },
      {
        $lookup: {
          from: "reported_users",
          localField: "user_id",
          foreignField: "reported_user_id",
          as: "report",
        },
      },
      {
        $project: {
          _id: 1,
          user_id: 1,
          userName: 1,
          email: 1,
          bio: 1,
          profilePicture: 1,

          report: { $arrayElemAt: ["$report.report", 0] },
        },
      },
    ]);

    res.status(200).send(reportedUsersWithReport);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteReportedProfiles = async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await profile.findById(profileId);
    if (!profile) {
      return res.status(404).send({ message: "Profile not found" });
    }
    if (profile.is_reported) {
      await profile.findByIdAndDelete(profileId);
      return res.status(200).send({ message: "Profile deleted" });
    } else {
      return res.status(403).send({ message: "Profile cannot be deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
exports.getAllprofiles = async (req, res) => {
  try {
    const profiles = await profile.find();
    res.status(200).send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
exports.getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find();
    res.status(200).send(jobPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
