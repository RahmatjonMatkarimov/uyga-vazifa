const { Schema, model } = require("mongoose")

const book = new Schema({
    title: {
        type: String,
        required: true,
        set: val => val.trim(),
        minLength: 3,
        maxLength: 80,
        match: /^[a-zA-Z\s]+$ /
    },
    periot: {
        type: String,
        required: true,
        enum: ["Temuriylar davri", "Jadid adabiyoti", "Savet davri", "Mustaqillik davri"]
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        minLength: 10
    },
    page: {
        type: Number,
        required: true,
        match: /^[1-9\s]+$ /,
        min: 1
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
    author_info: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
})

const bookSchema = model("book", book)
module.exports = bookSchema