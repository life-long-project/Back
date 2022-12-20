const mongoose = require("mongoose")

const job_types_schema = new mongoose.Schema({
    // job_types attributes
    id:{
        type : String,
        required: true,
    },
    type:{
        type : String,
        required: true,
    },
})

module.exports = mongoose.model("job_types",job_types_schema)