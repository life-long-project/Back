const mongoose = require("mongoose")

const job_location_schema = new mongoose.Schema({
    // job_location attributes
    st_address:{
        type : String,
        required: true,
    },
    city:{
        type : String,
        required: true,
    },
    governorate:{
        type : String,
        required: true,
    },
    country:{
        type : String,
        required: true,
        default: "Egypt"
    }
})

module.exports = mongoose.model("job_location",job_location_schema)