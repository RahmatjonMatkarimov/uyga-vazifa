const { Router } = require("express");
const { getauthors, putauthor, getOneauthor, Deleteauthor, postauthor } = require("../controller/author.controller");
const authorRouter = Router();


authorRouter.get("/author", getauthors)
authorRouter.get("/author/:id", getOneauthor)
authorRouter.delete("/author/:id", Deleteauthor)
authorRouter.post("/author/:id", postauthor)
authorRouter.put("/author/:id", putauthor)

module.exports = authorRouter;
