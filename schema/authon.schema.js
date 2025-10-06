const { Schema, model } = require("mongoose")

const Author = new Schema({
    fullneme: {
        type: "string",
        required: true
    },
    bith_date: {
        type: "string",
        required: true
    },
    death_date: {
        type: "string",
        required: true
    },
    periot: {
        type: "string",
        required: true
    },
    img: {
        type: "string",
        required: true
    },
    bio: {
        type: "string",
        required: true
    },
    creativite: {
        type: "string",
        required: true
    },
    region: {
        type: "string",
        required: true
    },
})

const authorSchema = model("Author",Author)
module.exports = authorSchema