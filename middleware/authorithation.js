const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.AccessToken

        if (!token) {
            logger.info(`authorithation error  ---- token not found`)
            return res.status(400).json({ massage: "token not found" })
        }

        const decode = jwt.verify(token, process.env.ACCES_TOKEN)
        req.user = decode

        if (!["admin", "superAdmin"].includes(req.user.role)) {
            logger.info(`authorithation error  ---- you are not admin and superAdmin`)
            return res.status(400).json({ massage: "you are not admin and superAdmin " })
        }

        next()
    } catch (error) {
        next(error)
    }
}