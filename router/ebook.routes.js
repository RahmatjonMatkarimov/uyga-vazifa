const { Router } = require("express");
const { DeleteEbook, postEbook, getOneEbook } = require("../controller/ebook.controller");
const ebookValidatorMiddleware = require("../middleware/ebook.validator.middleware");
const multer = require("multer");
const authorithation = require("../middleware/authorithation");
const eBookRouter = Router();

const path = require("path");
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage: storage })

eBookRouter.get("/eBook/:id", getOneEbook)
eBookRouter.post("/eBook", authorithation, ebookValidatorMiddleware, upload.single('ebook_url'), postEbook)
eBookRouter.delete("/eBook/:id", authorithation, DeleteEbook)

module.exports = eBookRouter;
