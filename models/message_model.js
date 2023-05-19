const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.ObjectId,
      ref: "Conversation",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Message = mongoose.model("Message", messageSchema);
