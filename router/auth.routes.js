const { Router } = require("express");
const { register, login, logout, forgotPassVerify, resetPassword } = require("../controller/auth.controller");
const { verify } = require("jsonwebtoken");
const refreshToken = require("../middleware/refreshToken");
const authValidator = require("../validator/auth.validator");
const authRouter = Router();


authRouter.post("/register", authValidator, register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.post("/refreshToken", refreshToken)
authRouter.get("/logout", logout)
authRouter.post("/forgotPasswordVerify", forgotPassVerify)
authRouter.post("/resetPassword", resetPassword)

module.exports = authRouter;
