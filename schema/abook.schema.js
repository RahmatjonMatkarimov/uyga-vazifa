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
    audio_url: {
        type: String,
        required: true
    },
})

const audioSchema = model("audio", audio)
module.exports = audioSchema