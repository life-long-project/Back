const express = require("express");
const router = express.Router();
const { route } = require("./messeges");
const Conversation = require("../../models/conversation");
const { Mongoose } = require("mongoose");
const UserModel = require("../../models/user");
const io = require("../../socket");
const message_model = require("../../models/message_model");

// get the messages of a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await message_model.find({
      conversationId: conversationId,
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch conversation messages" });
  }
});

//start a new conversation between two users
router.post("/first_message", async (req, res, next) => {
  try {
    const { senderId, receiverId, text } = req.body;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      receiver: receiverId,
      senderName: UserModel.findById(senderId)
        .then((user) => user.f_name)
        .catch((err) => err),
      receiverName: UserModel.findById(receiverId)
        .then((user) => user.f_name)
        .catch((err) => err),
      text,
    });

    const savedMessage = await newMessage.save();

    if (savedMessage) {
      res
        .status(201)
        .json({ message: "Message sent successfully", savedMessage });
    }
  } catch {
    res.status(500).json({ message: err.message, err });
  }
});

//send a message inside the conversation
router.post("/new_message", async (req, res) => {
  const newMessage = await new message_model(req.body);
  try {
    const savedMesseges = await newMessage.save();
    Conversation.findByIdAndUpdate(
      req.body.conversationId,
      { $push: { messages: savedMesseges } },
      {
        new: true,
      }
    );
    io.getIO().to(req.body.conversationId);
    res.status(200).json(savedMesseges);
  } catch (err) {
    res.status(500).json({ message: err.message, err });
  }
});

//get all the chats of a user by his id
router.get("/chats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve all conversations where the user is a member
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });
    if (conversations.length === 0) {
      res.status(200).json({
        status: 0,
        message: "there is no conversations yet , start one !",
      });
    } else {
      res.status(200).json({ status: 0, conversations });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user chats" });
  }
});

module.exports = router;
