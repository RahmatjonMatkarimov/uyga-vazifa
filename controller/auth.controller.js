const bcryptjs = require("bcryptjs")
const authSchema = require("../schema/auth.schema")
const send_otp = require("../utils/send_otp")
const { accesToken, refreshToken } = require("../utils/generator_token")

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body


        const foundedUser = await authSchema.find({ email })

        if (foundedUser.length) {
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

        res.status(201).json({
            massage: "registered"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

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
            res.status(404).json({ massage: "user not found" })
        }

        const time = Date.now()
        if (foundedUser.otpTime < time) {
            res.status(400).json({ massage: "otp expired" })
        }

        if (foundedUser.otp !== otp) {
            res.status(400).json({ massage: "wrong otp" })
        }

        if (foundedUser.otp === otp) {
            await authSchema.findByIdAndUpdate(foundedUser._id, { isVerified: true, otp: null, otpTime: null })
        }


        res.status(201).json({
            massage: "verify"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

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
            res.status(404).json({ massage: "user not found" })
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
            res.status(400).json({
                massage: "wrong password"
            })
        }


    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}

const logout = async (req, res) => {
    try {

        res.clearCookie("AccessToken")
        res.clearCookie("RefreshToken")

    } catch (err) {
        res.status(500).json({
            massage: err
        })

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

    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, email } = req.params

        if (!password, !email) {
            return res.status(400).json({ massage: "passwprd required" })
        }

        const foundedUser = await authSchema.findOne({ email })

        if (!foundedUser) {
            return res.status(404).json({ massage: "user not found" })
        }

        const time = Date.now()
        if (foundedUser.otpTime < time) {
            res.status(400).json({ massage: "otp expired" })
        }

        if (foundedUser.otp !== otp) {
            res.status(400).json({ massage: "wrong otp" })
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