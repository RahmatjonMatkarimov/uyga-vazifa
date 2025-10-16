const { Router } = require("express");
const { getbooks, getOnebook, Deletebook, postbook, putbook, search } = require("../controller/book.controller");
const bookValidatorMiddleware = require("../middleware/book.validator.middleware");
const authorithation = require("../middleware/authorithation");
const bookRouter = Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage: storage })

bookRouter.get("/book", getbooks)
bookRouter.get("/book/:id", getOnebook)
bookRouter.delete("/book/:id", authorithation, Deletebook)
bookRouter.post("/book", authorithation, bookValidatorMiddleware, upload.single("img"), postbook)
bookRouter.put("/book/:id", authorithation, upload.single("img"), putbook)
bookRouter.get("/search_book", search)

module.exports = bookRouter;
