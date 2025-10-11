const bookValidator = require("../validator/book.volidator")

module.exports = (req, res, next) => {
    try {
        const { error } = bookValidator(req.body)

        if (error) {
            return res.status(400).json({ massage: error.message })
        }
        next()
    } catch (error) {
        next(error)
    }
}