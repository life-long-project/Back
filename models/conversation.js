const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message_model",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
