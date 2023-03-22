const moment = require("moment/moment");
const chat = require("../models/chat");
const generateMessage = function () {
  return {
    from: chat.sender_username,
    text: chat.message,

    createdAt: moment().valueOf(),
  };
};
const generateLocationMessage = function (latitude, longitude) {
  return {
    from: chat.sender_username,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
  };
};
// create a fuction to upload a file inside the chat room
const generateFileMessage = function (file) {
  return {
    from: chat.sender_username,
    file,
    createdAt: moment().valueOf(),
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
  generateFileMessage,
};
