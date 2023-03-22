const mongoose = require("mongoose");

const user = require("./user_schema");

const adminSchema = user.discriminator(
  "Admin",
  new mongoose.Schema({
    isAdmin: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: [String],
      default: ["read", "write", "delete"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);
module.exports = mongoose.model("Admin", adminSchema);
