const mongoose = require("mongoose");

const user_profile_schema = new mongoose.Schema(
  {
    //   to check if the user is a job seeker or an customer
    //   mode_id: {
    //     type: Boolean,
    //     required: true,
    //   },

    //   //////////////////////////////////////////////////////////////////////////

    //   to handle the token of the user
    //   tokens: [
    //     {
    //       token: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //   ],

    is_admin: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      // default: " ahmed khaled",
    },
    bio: {
      type: String,
      required: true,
      // default: "i'am a worker",
    },
    age: {
      type: Number,
      required: true,
    },
    following: {
      type: Boolean,
      required: false,
      default: false,
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    feed_back: {
      type: [String],
      required: false,
      default: ["this user is a good problem solver "],
    },
    past_jobs: {
      type: [String],
      required: false,
      default: ["backend devoloper", "frontend devoloper"],
    },
    rate_quantity: {
      type: Number,
      // required: true,
      default: 4.5,
    },
    rate_average: {
      type: Number,
      // required: true,
      default: 0,
    },
    profile_image: {
      type: String,
      //   required: [true, "a user must have an image"],
    },
    user_image_url: {
      type: String,
      // required: false,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
    },
    work_image_url: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
    },
    is_active: {
      type: Boolean,
      // required: true,
      // default: false,
    },
    is_reported: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const profile = mongoose.model("profile", user_profile_schema);

module.exports = profile;
