const mongoose = require("mongoose")

const user_types_schema = new mongoose.Schema({
    // user_types attributes
    type:{
        type : String,
        required: true,
    },
})

module.exports = mongoose.model("user_types",user_types_schema)