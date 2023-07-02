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
        const message = await Message.create({
          conversation: conversationId,
          sender: senderId,
          text,
        });
        const savedMessage = await message.save();
        if (savedMessage) {
          io.to(conversationId).emit("newMessage", savedMessage);
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    return io;
  });
};

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
