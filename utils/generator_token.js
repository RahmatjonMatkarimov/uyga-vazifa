const jwt = require("jsonwebtoken")

const accesToken = async (payload) => {
    try {
        return await jwt.sign(payload, process.env.ACCES_TOKEN, { expiresIn: "15m" })
    } catch (err) {
        throw new Error(err)
    }
}

const refreshToken = async (payload) => {
    try {
        return await jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "15d" })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    accesToken,
    refreshToken
}