const { Schema, model } = require("mongoose")

const book = new Schema({
    title: {
        type: String,
        required: true
    },
    periot: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    published_year: {
        type: String,
        required: true
    },
    ganre: {
        type: String,
        required: true
    },
    published_home: {
        type: String,
        required: true
    },
})

const bookSchema = model("book",book)
module.exports = bookSchema