const { Router } = require("express");
const { login, register } = require("../controller/auth.controller");

const authRouter = Router()

authRouter.post("/login",login)
authRouter.post("/register",register)

module.exports = authRouter