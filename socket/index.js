const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const generateLocationMessage = require("../routes/public/messeges");
let users = [];
const addUSer = (userId, socketId) => {
  !users.some((user) => user.userId) && users.push({ userId, socketId });
};

const removeUSer = (socketId) => {
  users = users.filter((user) => user.socket.Id !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log("a user has connected");
  io.emit("welcome", "this is the socket server");
  //take the user id and socket id from the user
  socket.on("addUser", (userId) => {
    addUSer(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ userId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
    socket.on("createLocationMessage", (coords) => {
      io.emit(
        "newLocationMessage",
        generateLocationMessage("user", coords.latitude, coords.longitude)
      );
    });
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected ! ");
    removeUSer(socket.Id);
    io.emit("getUsers", users);
  });
});
