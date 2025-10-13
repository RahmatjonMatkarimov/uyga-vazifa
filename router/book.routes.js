const { Router } = require("express");
const { getbooks, getOnebook, Deletebook, postbook, putbook, search } = require("../controller/book.controller");
const bookValidatorMiddleware = require("../middleware/book.validator.middleware");
const authorithation = require("../middleware/authorithation");
const bookRouter = Router();


bookRouter.get("/book", getbooks)
bookRouter.get("/book/:id", getOnebook)
bookRouter.delete("/book/:id",authorithation, Deletebook)
bookRouter.post("/book",authorithation, bookValidatorMiddleware, postbook)
bookRouter.put("/book/:id",authorithation, putbook)
bookRouter.get("/search_book", search)

module.exports = bookRouter;
