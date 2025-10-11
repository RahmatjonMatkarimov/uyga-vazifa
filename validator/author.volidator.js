const joi = require("joi")

const authorValidator = (data) => {
    const schema = joi.object({
        fullneme: joi.string().min(3).max(80).required(),
        bith_date: joi.number().integer().min(1).required(),
        death_date: joi.string().required(),
        periot: joi.string().min(3).max(80).required(),
        img: joi.string().min(3).required(),
        bio: joi.string().min(3).max(10000).required(),
        creativite: joi.string().min(3).required(),
        region: joi.string().min(3).max(80).required(),
        books: joi.string().min(3).required(),
    })
    return schema.validate(data)
}

module.exports = authorValidator