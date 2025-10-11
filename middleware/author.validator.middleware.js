const authorValidator = require("../validator/author.volidator")

module.exports = (req, res, next) => {
    try {
        const { error } = authorValidator(req.body)

        if (error) {
            return res.status(400).json({ massage: error.message })
        }
        next()
    } catch (error) {
        next(error)
    }
}