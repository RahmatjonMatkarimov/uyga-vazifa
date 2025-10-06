const { Router } = require("express");
const { getbooks, getOnebook, Deletebook, postbook, putbook } = require("../controller/book.controller");
const bookRouter = Router();


bookRouter.get("/book", getbooks)
bookRouter.get("/book/:id", getOnebook)
bookRouter.delete("/book/:id", Deletebook)
bookRouter.post("/book/:id", postbook)
bookRouter.put("/book/:id", putbook)

module.exports = bookRouter;
