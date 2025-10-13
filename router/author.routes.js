const { Router } = require("express");
const { getauthors, putauthor, getOneauthor, Deleteauthor, postauthor, search } = require("../controller/author.controller");
const authorValidatorMiddleware = require("../middleware/author.validator.middleware");
const authorithation = require("../middleware/authorithation");
const authorRouter = Router();


authorRouter.get("/author", getauthors)
authorRouter.get("/author/:id", getOneauthor)
authorRouter.delete("/author/:id",authorithation, Deleteauthor)
authorRouter.post("/author",authorithation, authorValidatorMiddleware, postauthor)
authorRouter.put("/author/:id",authorithation, putauthor)
authorRouter.get("/search", search)

module.exports = authorRouter;
