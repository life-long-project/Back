const mongoose = require("mongoose");
// const user_Schema = require("./user");
// const user = mongoose.model("user", user_Schema);
// const contacts_Schema = require("./contacts");
// const contacts = mongoose.model("contacts", contacts_Schema);
// const chat_Schema = require("./chat");
// const chat = mongoose.model("chat", chat_Schema);
// const message_Schema = require("./message");
// const message = mongoose.model("message", message_Schema);
// const file_Schema = require("./file");
// const file = mongoose.model("file", file_Schema);
// const location_Schema = require("./location");
// const location = mongoose.model("location", location_Schema);
// create a schema to store the user's contacts

const contacts_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  contacts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});
module.exports = mongoose.model("contacts", contacts_Schema);
