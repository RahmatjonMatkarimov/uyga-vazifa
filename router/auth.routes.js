const { Router } = require("express");
const {
  login,
  register,
  updateRole
} = require("../controller/auth.controller");
const SuperAdminMiddleWare = require("../middleware/SuperAdmin.middleWare");
const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/update_role",SuperAdminMiddleWare, updateRole);

module.exports = authRouter;
