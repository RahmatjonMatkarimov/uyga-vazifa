const { Router } = require("express");
const {
  login,
  UserRegister,
  BigAdminRegister,
  AdminRegister,
} = require("../controller/auth.ctr");
const authMiddleWare = require("../middleware/auth.middleWare");
const BigAdminMiddleWare = require("../middleware/BigAdmin.middleWare");

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register_admin", BigAdminMiddleWare, AdminRegister);
authRouter.post("/register_superAdmin", BigAdminMiddleWare, BigAdminRegister);
authRouter.post("/register_user", authMiddleWare, UserRegister);

module.exports = authRouter;
