const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.AccessToken

        if (!token) {
            res.status(400).json({ massage: "token not found" })
        }

        const decode = jwt.verify(token, process.env.ACCES_TOKEN)
        req.user = decode

        if (!["admin", "superAdmin"].includes(req.user.role)) {
            res.status(400).json({ massage: "you are not admin and superAdmin " })

        }

        next()
    } catch (error) {
        next(error)
    }
}