const mongoose = require("mongoose");

const reported_users_schema = new mongoose.Schema(
  {
    // reported_users attributes
    reported_id: {
      type: String,
      required: true,
    },
    reporter_id: {
      type: String,
      required: true,
    },
    title: {
      type: Text,
      required: true,
    },
    report: {
      type: Text,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reported_users", reported_users_schema);
