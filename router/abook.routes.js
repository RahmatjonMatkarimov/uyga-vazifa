const { Router } = require("express");
const { postAudio, getOneAudio, DeleteAudio } = require("../controller/aBook.controller");
const abookValidatorMiddleware = require("../middleware/abook.validator.middleware");
const multer = require("multer");
const aBookRouter = Router();

const upload = multer({ dest: '../upload' })

aBookRouter.get("/aBook", getOneAudio)
aBookRouter.post("/aBook",abookValidatorMiddleware,upload.single('audio_url'), postAudio)
aBookRouter.delete("/aBook/:id", DeleteAudio)

module.exports = aBookRouter;
