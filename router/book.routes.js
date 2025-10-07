const { Router } = require("express");
const { getbooks, getOnebook, Deletebook, postbook, putbook, search } = require("../controller/book.controller");
const bookRouter = Router();


bookRouter.get("/book", getbooks)
bookRouter.get("/book/:id", getOnebook)
bookRouter.delete("/book/:id", Deletebook)
bookRouter.post("/book", postbook)
bookRouter.put("/book/:id", putbook)
bookRouter.put("/search_book", search)

module.exports = bookRouter;
