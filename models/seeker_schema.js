const mongoose = require("mongoose");
const { discriminator } = require("./user_schema");
const user = require("./user_schema");

const seekerSchema = user.discriminator(
  {
    role: {
      type: String,
      default: "seeker",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { discriminatorKey: "role" }
);

module.exports = mongoose.model("Seeker", seekerSchema);
