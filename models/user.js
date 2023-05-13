const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        default: "Temp-Username"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        default: "male",
        enum: ["male", "female"]
    },
    cities: {
        type: Array,
        default: ["Cairo"]
    },
    country: {
        type: String,
        default: "Egypt"
    },
    phone: {
        type: String,
    },
    profile_url: {
        type: String,
        default: "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1682517154/images/ntn03pogiz3nxlmbq7be.png"
    },
    id_url: {
        type: String,
        default: ""
    },
    past_experience: {
        type: String,
        default: ""
    },
    skills: {
        type: Array,
        default: []
    },
    rating:{
        type: Number,
        default: 0
    },
    total_rating:{
        type: Number,
        default: 0
    }


}, {
    timestamps: true,
    autoIndex: true,
});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;