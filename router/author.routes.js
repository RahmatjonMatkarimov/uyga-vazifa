const { Router } = require("express");
const { getauthors, putauthor, getOneauthor, Deleteauthor, postauthor, search } = require("../controller/author.controller");
const authorValidatorMiddleware = require("../middleware/author.validator.middleware");
const authorRouter = Router();


authorRouter.get("/author", getauthors)
authorRouter.get("/author/:id", getOneauthor)
authorRouter.delete("/author/:id", Deleteauthor)
authorRouter.post("/author", authorValidatorMiddleware, postauthor)
authorRouter.put("/author/:id", putauthor)
authorRouter.get("/search", search)

module.exports = authorRouter;
