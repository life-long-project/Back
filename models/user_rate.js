const User = require('./user');
const Notification = require("./notification")

const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const user_rate_Schema = new mongoose.Schema({
    rater_id: {
        type: ObjectId,
        required: true
    },
    rated_id: {
        type: ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        required: true,
        trim: true
    },

}, {
    timestamps: true,
    autoIndex: true,
});

user_rate_Schema.pre('save', async function (next) {
    try {
        const user = await User.findOne(this.rated_id)
        const total_Nrating = (user.total_Nrating || 0) + 1
        const new_rating = this.rating
        const current_rating = (user.rating || 0)
        const updated_rating = (current_rating * user.total_Nrating + new_rating) / total_Nrating

        console.log(
            "user: "+user,
            "total_Nrating:"+total_Nrating,
            "new_rating:"+new_rating,
            "current_rating:"+current_rating,
            "updated_rating:"+updated_rating
        )

        await User.findByIdAndUpdate(this.rated_id,{
            rating: updated_rating,
            total_Nrating: total_Nrating
        })
        next()
    }catch (err) {
        next(err)
    }
})

user_rate_Schema.pre('save', async function (next) {
    const notification = new Notification({
        action: 'rating',
        from_id: this.rater_id,
        for_id: this.rated_id,
    })
    await notification.save()
    next()
})



const User_rateModel = mongoose.model('User_rate', user_rate_Schema);
module.exports = User_rateModel;