const logger = require("../utils/logger")
const eBookValidator = require("../validator/ebook.volidator")

module.exports = (req, res, next) => {
    try {
        const { error } = eBookValidator(req.body)

        if (error) {
            logger.error(`eBookValidator middleware error --- error:${error}`)
            return res.status(400).json({ massage: error.message })
        }
        next()
    } catch (error) {
        next(error)
    }
}