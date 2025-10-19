const authorValidator = require("../validator/author.volidator")
const logger = require("../utils/logger")

module.exports = (req, res, next) => {
    try {
        const { error } = authorValidator(req.body)
        if (error) {
            logger.error(`authorValidator middleware error --- error:${error}`)
            return res.status(400).json({ massage: error.message })
        }
        next()
    } catch (error) {
        next(error)
    }
}