const { Router } = require("express");
const { postAudio, getOneAudio, DeleteAudio } = require("../controller/aBook.controller");
const abookValidatorMiddleware = require("../middleware/abook.validator.middleware");
const multer = require("multer");
const authorithation = require("../middleware/authorithation");
const path = require("path");
const aBookRouter = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage: storage })

aBookRouter.get("/aBook/:id", getOneAudio)
aBookRouter.post("/aBook", authorithation, abookValidatorMiddleware, upload.single('audio_url'), postAudio)
aBookRouter.delete("/aBook/:id", authorithation, DeleteAudio)

module.exports = aBookRouter;
