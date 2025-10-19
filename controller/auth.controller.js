const bcryptjs = require("bcryptjs")
const authSchema = require("../schema/auth.schema")
const send_otp = require("../utils/send_otp")
const { accesToken, refreshToken } = require("../utils/generator_token")
const logger = require("../utils/logger")

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body

        logger.info(`register DATA ------ username:${username}, email:${email}, password:${password}`)
        const foundedUser = await authSchema.find({ email })

        if (foundedUser.length) {
            logger.info("bu foydalanuvchi allaqachon mavjud " + email)
            return res.status(400).json({ massage: "bu foydalanuvchi allaqachon mavjud" })
        }

        const hashPassword = await bcryptjs.hash(password, 12)
        const data = Date.now() + 120000
        const rendomNum = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

        send_otp(email, rendomNum)

        await authSchema.create({
            username,
            email,
            password: hashPassword,
            otp: rendomNum,
            otpTime: data
        })

        logger.info(`registerd succuss: ------ email:${email}, username:${username}, password:${password}, otp:${otp}, otpTime: ${otpTime}`)

        res.status(201).json({
            massage: "registered"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`register error ----- ${err}`)
    }
}

const verify = async (req, res) => {
    try {
        const {
            email,
            otp
        } = req.body

        const foundedUser = await authSchema.findOne({ email })
        if (!foundedUser.length) {
            logger.info(`verify: user not found, email:${email}`)
            return res.status(404).json({ massage: "user not found" })
        }

        const time = Date.now()
        if (foundedUser.otpTime < time) {
            logger.info(`verify: otp expired, otpTime:${otpTime}`)
            return res.status(400).json({ massage: "otp expired" })
        }

        if (foundedUser.otp !== otp) {
            logger.info(`verify: wrong otp, otpTime:${otp}`)
            return res.status(400).json({ massage: "wrong otp" })
        }

        if (foundedUser.otp === otp) {
            await authSchema.findByIdAndUpdate(foundedUser._id, { isVerified: true, otp: null, otpTime: null })
        }

        logger.info(`verify soccuess`)

        res.status(201).json({
            massage: "verify"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`verify error ----- ${err}`)
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const foundedUser = await authSchema.findOne({ email })

        if (!foundedUser) {
            logger.info(`login: user not found, email:${email}`)
            return res.status(404).json({ massage: "user not found" })
        }

        const decode = await bcryptjs.compare(password, foundedUser.password)

        if (decode) {
            const payload = {
                username: foundedUser.username,
                id: foundedUser._id,
                role: foundedUser.role,
            }

            const acces = accesToken(payload)
            const refresh = refreshToken(payload)
            res.cookie("AccessToken", acces, { httpOnly: true, maxAge: 15 * 60 * 1000 })
            res.cookie("RefreshToken", refresh, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 })
            res.status(201).json({
                massage: "seccess",
                acces
            })
        } else {
            logger.info(`login ------ wrong pasword email:${email}`)
            return res.status(400).json({
                massage: "wrong password"
            })
        }
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`login error ----- ${err}`)

    }
}

const logout = async (req, res) => {
    try {

        res.clearCookie("AccessToken")
        res.clearCookie("RefreshToken")
        logger.info(`logout succuess`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`logout error ----- ${err}`)
    }
}


const forgotPassVerify = async (req, res) => {
    try {
        const {
            email,
        } = req.body

        const data = Date.now() + 120000
        const rendomNum = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

        send_otp(email, rendomNum)

        await authSchema.findByIdAndUpdate(foundedUser._id, {
            otp: rendomNum,
            otpTime: data,
            isVerified: false
        })

        res.status(201).json({
            massage: "verify"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`forgotPassVerify error ----- ${err}`)
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, email } = req.params
        const foundedUser = await authSchema.findOne({ email })

        if (!foundedUser) {
            logger.info(`resetPassword ------- user not found email:${email}`)
            return res.status(404).json({ massage: "user not found" })
        }

        const time = Date.now()
        if (foundedUser.otpTime < time) {
            logger.info(`resetPassword ------- otp expired email:${email}`)
            return res.status(400).json({ massage: "otp expired" })
        }

        if (foundedUser.otp !== otp) {
            return res.status(400).json({ massage: "wrong otp" })
        }

        if (foundedUser.otp === otp) {
            const hashPassword = bcryptjs.hash(password, 12)
            await authSchema.findByIdAndUpdate(foundedUser._id, {
                password: hashPassword,
                isVerified: true,
                otp: null,
                otpTime: null
            })
        }
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`resetPassword error ----- ${err}`)
    }
}

module.exports = {
    register,
    verify,
    login,
    logout,
    forgotPassVerify,
    resetPassword
}