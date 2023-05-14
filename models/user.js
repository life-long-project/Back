const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
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
    phone: {
        type: String,
    },
    gender: {
        type: String,
        default: "male",
        enum: ["male", "female"]
    },
    age: {
        type: Number
    },
    cities: {
        type: Array,
        default: ["Cairo"]
    },
    country: {
        type: String,
        default: "Egypt"
    },
    past_experience: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
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
    profile_url: {
        type: String,
        default: "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1682517154/images/ntn03pogiz3nxlmbq7be.png"
    },
    id_url: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    total_rating: {
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
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
);


UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;