const { Router } = require("express");
const { postAudio, getOneAudio, DeleteAudio } = require("../controller/aBook.controller");
const abookValidatorMiddleware = require("../middleware/abook.validator.middleware");
const aBookRouter = Router();

aBookRouter.get("/aBook", getOneAudio)
aBookRouter.post("/aBook",abookValidatorMiddleware, postAudio)
aBookRouter.delete("/aBook/:id", DeleteAudio)

module.exports = aBookRouter;
