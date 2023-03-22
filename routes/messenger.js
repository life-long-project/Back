const express = require("express");
const router = express.Router();
const io = require("../socket");
const { check, validationResult } = require("express-validator");
// const auth = require("../middleware/isAuth");
const contacts = require("../models/contacts.js");
const chat = require("../models/chat.js");
const {
  generateMessage,
  generateLocationMessage,
  generateFileMessage,
} = require("../utils/messenger");

router.get("/", async (req, res, next) => {
  try {
    const userContacts = await contacts.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (!userContacts)
      return res.status(400).json({ msg: "there is no contacts yet" });
    else {
      res.status(200).json(userContacts);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userChat = await contacts.findById(req.params.id);
    if (!userChat) return res.status(400).json({ msg: "send a messege !" });
    else {
      res.status(200).json(userChat);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(":/id", async (req, res, next) => {
  io.getIO("connection", (socket) => {
    console.log("the user just connected to the server");
    socket.emit("newMessage", generateMessage("admin", "welcome to the chat"));
    socket.broadcast.emit("new message", generateMessage("admin", "new user"));
    socket.on("createMessage", (message) => {
      io.emit("newMessage", generateMessage(message.from, message.text));
    });
    socket.getIO("createFile", (file) => {
      console.log("createFile", file);
      io.emit("newFile", generateFileMessage(file.from, file.file));
    });
    socket.getIO("createLocationMessage", (coords) => {
      io.emit(
        "newLocationMessage",
        generateLocationMessage("user", coords.latitude, coords.longitude)
      );
    });

    res.status(200).json({
      message: message,
    });
  });
});

router.delete("/:id", async (req, res, next) => {
  try {
    let contact = await contacts.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    res.json({ msg: "contact deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
