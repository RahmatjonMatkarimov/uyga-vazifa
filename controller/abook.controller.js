const audioSchema = require("../schema/abook.schema")
const logger = require("../utils/logger")

const postAudio = async (req, res) => {
    try {
        const {
            book_id, author_id
        } = req.body

        await audioSchema.create({
            book_id, author_id, audio_url: req.file.filename
        })

        logger.info(`postAudio data book_id: ${book_id}, author_id:${author_id}, filename:${req.file.filename}`)

        res.status(201).json({
            massage: "bajarildi"
        })

        logger.info("postAudio success")
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error("postAudio error ----" + err)
    }
}
const getOneAudio = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await audioSchema.find({ book_id: id })
        if (!foundedAutor) {
            logger.info("getOneAudio ----- abook not found id " + id)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }
        res.status(200).json({
            foundedAutor
        })
        logger.info("getOneAudio success")

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error("getOneAudio error ----" + err)
    }
}
const DeleteAudio = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await AudioSchema.findById(id)
        if (!foundedAutor) {
            logger.info("audio not found" + id)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await AudioSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info("DeleteAudio success")
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error("DeleteAudio error ----" + err)
    }
}


module.exports = {
    getOneAudio,
    postAudio,
    DeleteAudio,
}