const { Schema, model } = require("mongoose")

const ctation = new Schema({
    desc: {
        type: String,
        required: true,
        minLength: 10
    },
    book_id: {
        type: String,
        required: true
    },
})

const ctationSchema = model("Ctation", ctation)
module.exports = ctationSchema