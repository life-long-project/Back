const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Notification = require("./notification");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    f_name: {
      type: String,
      required: true,
    },
    l_name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    age: {
      type: String,
    },
    cities: {
      type: Array,
      default: ["Cairo"],
    },
    country: {
      type: String,
      default: "Egypt",
    },
    past_experience: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    profile_url: {
      type: String,
      default:
        "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1688294025/test_rhvhku.png",
    },
    id_url: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    total_rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.pre("save", async function (next) {
  const user = this;
  this.f_name = this.f_name.toLowerCase();
  this.l_name = this.l_name.toLowerCase();
  this.full_name =
    this.f_name[0].toUpperCase() +
    this.f_name.slice(1).toLowerCase() +
    " " +
    this.l_name[0].toUpperCase() +
    this.l_name.slice(1).toLowerCase();
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
