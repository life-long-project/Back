const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router
  .route("/")
  .get(profileController.getAllprofiles)
  .post(profileController.createProfile);

router
  .route("/:id")
  .get(profileController.getProfileById)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
