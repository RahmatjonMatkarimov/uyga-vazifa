const { Router } = require("express");
const { register, login, logout, forgotPassVerify, resetPassword, verify } = require("../controller/auth.controller");
const refreshToken = require("../middleware/refreshToken");
const authValidatorMiddleware = require("../validator/auth.validator");
const authRouter = Router();


authRouter.post("/register",authValidatorMiddleware, register)
authRouter.post("/verify", verify   )
authRouter.post("/login", login)
authRouter.post("/refreshToken", refreshToken)
authRouter.get("/logout", logout)
authRouter.post("/forgotPasswordVerify", forgotPassVerify)
authRouter.post("/resetPassword", resetPassword)

module.exports = authRouter;
