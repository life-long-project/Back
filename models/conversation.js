const mongoose = require("mongoose");
const conversation_schema = mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  isFile: { type: Boolean, default: false },
  file: {
    type: Object,
    required: false,
  },
  seenBySender: Boolean,
  seenByReceiver: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("conversation", conversation_schema);
