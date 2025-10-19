const Joi = require("joi")

const schema = Joi.object({
    username: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().min(3).max(80).required(),
    password: Joi.string().min(8).max(80).required(),
    role: Joi.string().valid("user", "admin", "superAdmin"),
    otp: Joi.string(),
    otpTime: Joi.number().integer(),
    isVerified: Joi.boolean().default(false),
})

const authValidatorMiddleware = (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error
        })
    }
    next()
}

module.exports = authValidatorMiddleware
