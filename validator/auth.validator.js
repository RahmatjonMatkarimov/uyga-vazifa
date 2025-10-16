const joi = require("joi")

const authValidator = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(80).required(),
        email: joi.string().min(3).max(80).required(),
        password: joi.string().min(8).max(80).required(),
        role: joi.string().valid("user", "admin", "superAdmin").required(),
        otp: joi.string().required(),
        otpTime: joi.number().integer().required(),
        isVerified: joi.boolean().default(false),
    })

    return schema.validate(data)
}

module.exports = authValidator