const mongoose = require("mongoose");
const message_schema = new mongoose.Schema({
  //message attributes
  message_id: {
    type: String,
    required: true,
  },
  sender_id: {
    type: String,
    required: true,
  },
  receiver_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  is_read: {
    type: Boolean,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: true,
  },
  is_sent: {
    type: Boolean,
    required: true,
  },
  is_received: {
    type: Boolean,
    required: true,
  },
  is_seen: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("chat", message_schema);
