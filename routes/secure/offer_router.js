const Offer = require("../../models/offer");
const Job_post = require("../../models/job_post");
const Notification = require("../../models/notification");
const userModel = require("../../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { isValidObjectId, ObjectId } = require("mongoose");
const {
  validate_apply_offer,
  offer_validation,
} = require("../../middlewares/validation/offer");
const Activity = require("../../models/activity_log");

// todo: adding to readme later

// create new offer / apply for job
router.post(
  "/apply/:job_post_id",
  validate_apply_offer,
  offer_validation,
  async (req, res) => {
    try {
      const job_post_id = req.params.job_post_id;
      if (
        job_post_id.match(/^[0-9a-fA-F]{24}$/) &&
        isValidObjectId(job_post_id)
      ) {
        const offer = await Offer.findOne({
          applicant_id: req.user._id,
          job_post_id: job_post_id,
        });
        if (offer) {
          res.status(400).json({ message: "Already applied" });
        } else {
          const new_offer = new Offer({
            price: req.body.price || "0",
            message: req.body.message || "",
            applicant_id: req.user._id,
            applicant_name: req.user.username,
            job_post_id: job_post_id,
          });
          await new_offer.save();
          res.status(201).json({
            message: "offer applied",
            offer: new_offer,
          });
        }
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);
// accept an offer
router.post("/accept/:offer_id", async (req, res) => {
  try {
    const offer_id = req.params.offer_id;
    if (offer_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(offer_id)) {
      const old_offer = await Offer.findById(offer_id);

      await Offer.updateMany(
        { job_post_id: old_offer["job_post_id"] },
        { $set: { status: "rejected" } },
        { multi: true }
      );

      const offer = await Offer.findOneAndUpdate(
        { _id: offer_id },
        { status: "accepted" },
        { new: true }
      );

      const job_post = await Job_post.findOneAndUpdate(
        { _id: offer["job_post_id"] },
        {
          $set: {
            accepted_user_id: offer["applicant_id"],
            salary: offer['price'],
            is_active: false,
          },
        },
        { new: true }
      );

      const notification = new Notification({
        action: "your offer has been accepted",
        from_id: job_post["posted_by_id"],
        for_id: offer["applicant_id"],
        job_post_id: offer["job_post_id"],
      });
      await notification.save();

      await Activity.create({
        activity_message: "Offer is accepted",
        posted_by_id: req.user._id,
        category: 'job',
        for_id: offer["applicant_id"]
      })

      res.status(201).json({ message: "offer accepted" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// get all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    if (offers === null) {
      res.status(400).json({ message: "No offers yet" });
    } else {
      res.status(200).json(offers);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// get the present user applies for all jobs
router.get("/user/", async (req, res) => {
  try {
    const offers = await Offer.find({
      applicant_id: req.user._id,
    });
    if (offers === null) {
      res.status(400).json({ message: "No offers yet" });
    } else {
      res.status(200).json(offers);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//get all offers for specific job
router.get("/job/:job_id", async (req, res) => {
  try {
    const offers = await Offer.find({
      job_post_id: req.params.job_id,
      applicant_name: req.user.username,
    });
    if (offers === null) {
      res.status(400).json({ message: "No offers yet" });
    } else {
      res.status(200).json(offers);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:offer_id", async (req, res) => {
  try {
    const offer_id = req.params.offer_id;
    if (offer_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(offer_id)) {
      const offer = await Offer.findOne({ _id: req.params.offer_id });
      if (offer === null) {
        res.status(404).json({ message: "No offers with this id" });
      }
      res.status(200).json(offer);
    } else {
      res.status(404).json({ message: "Invalid offer id" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.delete("/:offer_id", async (req, res) => {
  try {
    const offer_id = req.params.offer_id;
    if (offer_id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(offer_id)) {
      const offer = await Offer.findOne({ _id: req.params.offer_id });
      if (offer === null) {
        res.status(404).json({ message: "No offers with this id" });
      } else {
        await offer.remove();
        res.status(201).json({ message: "offer is deleted" });
      }
    } else {
      res.status(404).json({ message: "Invalid offer id" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
