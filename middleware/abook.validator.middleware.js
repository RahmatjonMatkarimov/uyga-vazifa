const logger = require("../utils/logger")
const aBookValidator = require("../validator/abook.volidator")

module.exports = (req, res, next) => {
    try {
        const { error } = aBookValidator(req.body)

        if (error) {
            logger.error(`aBookValidator middleware error --- error:${error}`)
            return res.status(400).json({ massage: error.message })
        }
        next()
    } catch (error) {
        next(error)
    }
}