const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const isAuth = require("../middleware/isAuth");
const adminController = require("../controllers/adminController");
const Job_post = require("../models/job_post");
const User = require("../models/user_schema");

router.route("/profiles").get(isAuth, adminController.getAllprofiles);
router.route("/jobposts").get(isAuth, adminController.getAllJobPosts);

router
  .route("/profile_reports/:id")
  .get(isAuth, adminController.getReportedJobPosts)
  .delete(isAuth, adminController.deleteReportedJobPosts);
router
  .route("/jobpost_reports/:id")
  .get(isAuth, adminController.getReportedProfiles)
  .delete(isAuth, adminController.deleteReportedProfiles);

module.exports = router;
