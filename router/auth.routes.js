const { Router } = require("express");
const { register, login, logout } = require("../controller/auth.controller");
const { verify } = require("jsonwebtoken");
const refreshToken = require("../middleware/refreshToken");
const authRouter = Router();


authRouter.post("/register",register)
authRouter.post("/verify",verify)
authRouter.post("/login",login)
authRouter.post("/refreshToken",refreshToken)
authRouter.get("/logout",logout)

module.exports = authRouter;
