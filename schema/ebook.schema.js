const { Schema, model } = require("mongoose")

const audio = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    ebook_url: {
        type: String,
        required: true
    },
})

const audioSchema = model("ebook", audio)
module.exports = audioSchema