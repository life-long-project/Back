module.exports = (io) => {
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected." + socket.id);

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      console.log(userId, socket.id);
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("newMessage", {
        senderId,
        text,
      });
    });
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  //when disconnect
};
