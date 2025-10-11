const { Router } = require("express");
const { DeleteEbook, postEbook, getOneEbook } = require("../controller/ebook.controller");
const ebookValidatorMiddleware = require("../middleware/ebook.validator.middleware");
const multer = require("multer");
const eBookRouter = Router();
const upload = multer({ dest: '../upload' })

eBookRouter.get("/eBook", getOneEbook)
eBookRouter.post("/eBook", ebookValidatorMiddleware, upload.single('ebook_url'), postEbook)
eBookRouter.delete("/eBook/:id", DeleteEbook)

module.exports = eBookRouter;
