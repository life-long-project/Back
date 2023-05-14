const express = require("express");
const router = express.Router();
const { route } = require("./messenger_router");
const Conversation = require("../../models/conversation");
//create new conversation
router.post("/", async (req, res) => {
  const newConversation = new conversation({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {}
});

module.exports = router;