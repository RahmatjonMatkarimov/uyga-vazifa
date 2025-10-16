const nodemailer = require('nodemailer')

module.exports = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "rahmatjon974@gmail.com",
                pass: process.env.APP_PASS
            }
        })

        await transporter.sendMail({
            from: "rahmatjon974@gmail.com",
            to: email,
            subject: "devBook tasdiqlash kodi",
            text: "test",
            html: `<b>tasdiqlash code - ${otp}</b>`
        })
    } catch (err) {
        throw new Error(err)
    }
}