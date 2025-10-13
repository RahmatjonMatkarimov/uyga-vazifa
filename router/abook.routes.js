const { Router } = require("express");
const { postAudio, getOneAudio, DeleteAudio } = require("../controller/aBook.controller");
const abookValidatorMiddleware = require("../middleware/abook.validator.middleware");
const multer = require("multer");
const authorithation = require("../middleware/authorithation");
const aBookRouter = Router();

const upload = multer({ dest: '../upload' })

aBookRouter.get("/aBook", getOneAudio)
aBookRouter.post("/aBook",authorithation,abookValidatorMiddleware,upload.single('audio_url'), postAudio)
aBookRouter.delete("/aBook/:id",authorithation, DeleteAudio)

module.exports = aBookRouter;
