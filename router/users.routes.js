const { Router } = require("express");
const SuperAdminMiddleWare = require("../middleware/SuperAdmin.middleWare");
const { getUsers, getOneUsers, putUsers, DeleteUsers } = require("../controller/users.controller");
const UsersRouter = Router();

UsersRouter.get("/products", getUsers);
UsersRouter.get("/products/:id", getOneUsers);
UsersRouter.put("/products/:id", SuperAdminMiddleWare, putUsers);
UsersRouter.delete("/products/:id", SuperAdminMiddleWare, DeleteUsers);

module.exports = UsersRouter;
