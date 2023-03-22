const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const reported_jobs_schema = new mongoose.Schema(
  {
    // reported_jobs attributes
    job_post_id: {
      type: String,
      required: true,
    },
    reporter_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reported_jobs", reported_jobs_schema);
