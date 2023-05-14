const express = require("express");
const router = express.Router();
const Messeges = require("../../models/message_model");

router.post("/new_message", async (req, res) => {
  const newMessage = await new Messeges(req.body);
  try {
    const savedMesseges = await newMessage.save();
    conversation.findByIdAndUpdate(
      req.body.conversation,
      { $push: { messages: savedMessage } },
      {
        new: true,
      }
    );
    res.status(200).json(savedMesseges);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Messeges.find({
      conversation: req.params.conversationId,
    });
    // if (messages.length === 0) {
    //   res.status(200).json({
    //     status: 0,
    //     message: "No Messages yet",
    //     messages,
    //   });
    res.status(200).json({ status: 0, messages });
    // }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      err,
    });
  }
});

//get all the chats of the user --
router.get("/", (req, res) => {
  res.send("hello from the chats");
});

module.exports = router;
