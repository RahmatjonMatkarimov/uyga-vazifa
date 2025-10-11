const { Router } = require("express");
const { DeleteEbook, postEbook, getOneEbook } = require("../controller/ebook.controller");
const ebookValidatorMiddleware = require("../middleware/ebook.validator.middleware");
const eBookRouter = Router();

eBookRouter.get("/eBook", getOneEbook)
eBookRouter.post("/eBook", ebookValidatorMiddleware, postEbook)
eBookRouter.delete("/eBook/:id", DeleteEbook)

module.exports = eBookRouter;
