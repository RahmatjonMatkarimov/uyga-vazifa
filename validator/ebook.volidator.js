const joi = require("joi")

const eBookValidator = (data) => {
    const schema = joi.object({
        author_id: joi.string().min(3).required(),
        book_id: joi.string().min(3).required(),
        ebook_id: joi.string().min(3).required(),
    })

    return schema.validate(data)
}

module.exports = eBookValidator