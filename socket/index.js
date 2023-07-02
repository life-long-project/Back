const { init } = require("passport");
const Message = require("../models/message_model");
const Conversation = require("../models/conversation");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected");

    // Join conversation room
    socket.on("joinConversation", async (conversationId) => {
      socket.join(conversationId);

      try {
        // Load previous messages for the conversation
        const messages = await Message.find({
          conversation: conversationId,
        }).populate("sender", "fullName");
        socket.emit("previousMessages", messages);
      } catch (err) {
        console.error(err);
      }
    });

    // Handle incoming messages
    socket.on("sendMessage", async (data) => {
      const { conversationId, senderId, text } = data;

      try {
        // Save message to database
        const savedMessage = await saveMessage(conversationId, senderId, text);

        // Update conversation's lastMessage field
        await updateConversationLastMessage(conversationId, savedMessage.text);

        // Retrieve saved message with populated sender field
        const messageWithSender = await getMessageWithSender(savedMessage._id);

        // Emit the message to the conversation room
        io.to(conversationId).emit("messageReceived", messageWithSender);

        console.log(`Message with sender: ${messageWithSender}`);
        res.status(200).json(savedMessage);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message, err });
      }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

async function saveMessage(conversationId, senderId, text) {
  const message = new Message({
    conversation: conversationId,
    sender: senderId,
    text,
  });
  return message.save();
}

async function updateConversationLastMessage(conversationId, lastMessage) {
  return Conversation.findByIdAndUpdate(
    conversationId,
    { $set: { lastMessage } },
    { new: true }
  );
}

async function getMessageWithSender(messageId) {
  return Message.findById(messageId).populate("sender", "fullName");
}

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("IO is not initialized");
    }
    return io;
  },
};
