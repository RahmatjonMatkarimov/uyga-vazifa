const jwt = require("jsonwebtoken")
const { accesToken } = require("../utils/generator_token")
const logger = require("../utils/logger")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.RefreshToken

        if (!token) {
            logger.error(`refresh token middleware error --- token not found`)
            res.status(400).json({ massage: "token not found" })
        }

        const decode = jwt.verify(token, process.env.ACCES_TOKEN)
        req.user = decode
        const payload = {
            username: req.user.username,
            id: req.user._id,
            role: req.user.role,
        }

        const acces = accesToken(payload)
        res.cookie("AccessToken", acces, { httpOnly: true, maxAge: 15 * 60 * 1000 })

        next()
    } catch (error) {
        next(error)
    }
}