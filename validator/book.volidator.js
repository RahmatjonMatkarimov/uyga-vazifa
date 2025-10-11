const joi = require("joi")

const bookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(80).required(),
        periot: joi.string().min(3).max(80).required(),
        img: joi.string().min(3).required(),
        desc: joi.number().integer().min(3).max(10000).required(),
        page: joi.number().integer().min(10).required(),
        published_year: joi.string().required(),
        ganre: joi.string().min(3).required(),
        published_home: joi.string().min(3).required(),
    })

    return schema.validate(data)
}

module.exports = bookValidator