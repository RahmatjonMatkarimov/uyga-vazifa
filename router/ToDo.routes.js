const { Router } = require("express");
const {
  getList,
  PostList,
  PutList,
  DeleteList,
  DeleteChecket,
  Checket,
} = require("../controller/ToDo.controller");
const ToDoMiddeware = require("../middleware/ToDo.middeware");

const listRouter = Router();

listRouter.get("/data", ToDoMiddeware, getList);
listRouter.post("/data", ToDoMiddeware, PostList);
listRouter.put("/data/:id", ToDoMiddeware, PutList);
listRouter.delete("/data/:id", ToDoMiddeware, DeleteList);
listRouter.delete("/deleteChecket", ToDoMiddeware, DeleteChecket);
listRouter.get("/Checket", ToDoMiddeware, Checket);

module.exports = listRouter;
