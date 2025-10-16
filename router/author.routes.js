const { Router } = require("express");
const { getauthors, putauthor, getOneauthor, Deleteauthor, postauthor, search } = require("../controller/author.controller");
const authorValidatorMiddleware = require("../middleware/author.validator.middleware");
const authorithation = require("../middleware/authorithation");
const authorRouter = Router();

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage: storage })

authorRouter.get("/author", getauthors)
authorRouter.get("/author/:id", getOneauthor)
authorRouter.delete("/author/:id", authorithation, Deleteauthor)
authorRouter.post("/author", authorithation, authorValidatorMiddleware, upload.single("img"), postauthor)
authorRouter.put("/author/:id", authorithation, upload.single("img"), putauthor)
authorRouter.get("/search", search)

module.exports = authorRouter;
