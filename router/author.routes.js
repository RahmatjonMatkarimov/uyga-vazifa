const { Router } = require("express");
const { getauthors, putauthor, getOneauthor, Deleteauthor, postauthor, search } = require("../controller/author.controller");
const authorRouter = Router();


authorRouter.get("/author", getauthors)
authorRouter.get("/author/:id", getOneauthor)
authorRouter.delete("/author/:id", Deleteauthor)
authorRouter.post("/author", postauthor)
authorRouter.put("/author/:id", putauthor)
authorRouter.get("/search", search)

module.exports = authorRouter;
