const { Schema, model } = require("mongoose")

const Author = new Schema({
    fullneme: {
        type: String,
        required: true,
        set: val => val.trim(),
        minLength: 3,
        maxLength: 80,
        match: /^[a-zA-Z\s]+$ /
    },
    bith_date: {
        type: Number,
        required: true,
        max: 2000,
        min: 1,
        match: /^[1-9\s]+$ /
    },
    death_date: {
        type: String,
        required: true,
        maxLength: 2000,
        minLength: 1,
    },
    periot: {
        type: String,
        required: true,
        enum: ["Temuriylar davri", "Jadid adabiyoti", "Savet davri", "Mustaqillik davri"]
    },
    img: {
        type: String,
        required: true,
        minLength: 4
    },
    bio: {
        type: String,
        required: true,
        minLength: 10
    },
    creativite: {
        type: String,
        required: true,
        minLength: 5
    },
    region: {
        type: String,
        required: true
    },
    books: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: true
    }
})

const authorSchema = model("Author", Author)
module.exports = authorSchema