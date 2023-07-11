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
            required: false,
        },
        gender: {
            type: String,
            default: "male",
            enum: ["male", "female"],
        },
        age: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
            default: "Cairo",
        },
        country: {
            type: String,
            required: false,
            default: "Egypt",
        },
        past_experience: {
            type: String,
            default: "the user has no past experience",
        },
        skills: {
            type: [String],
            required: false,
            default: ["the user has no skills"],
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
            required: false,
            default:
                "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1688294025/test_rhvhku.png",
        },
        id_url: {
            type: String,
            required: false,
            default: "",
        },
        rating: {
            type: Number,
            default: 0,
        },
        total_Nrating: {
            type: Number,
            default: 0,
        },
        is_reported: {
            type: Boolean,
            default: false,
        },
        is_hidden: {
            type: Boolean,
            default: false,
        },
        report_messages: {
            type: String,
            default: "there is no reports",
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
