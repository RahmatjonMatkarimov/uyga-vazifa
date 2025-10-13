const { Schema, model } = require("mongoose")

const Auth = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["user", "admin", "superAdmin"]
        },
    },
    otp: {
        type: String,
        required: true,
    },
    otpTime: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
})

const authSchema = model("Auth", Auth)
module.exports = authSchema