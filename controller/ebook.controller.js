const EbookSchema = require("../schema/ebook.schema")

const postEbook = async (req, res) => {
    try {
        const {
            book_id, author_id
        } = req.body

        await EbookSchema.create({
            book_id, author_id, ebook_url: req.file.filename
        })
        logger.info(`postEbook data book_id: ${book_id}, author_id:${author_id}, filename:${req.file.filename}`)

        res.status(201).json({
            massage: "bajarildi"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error("postEbook error ----" + err)
    }
}
const getOneEbook = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await EbookSchema.find({ book_id: id })
        if (!foundedAutor) {
            logger.info("getOneEbook ----- ebook not found id " + id)

            return res.status(404).json({
                massage: "mavjud emas"
            })
        }
        logger.info("getOneEbook success")

        res.status(200).json({
            foundedAutor
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error("getOneEbook error ----" + err)
    }
}
const DeleteEbook = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await EbookSchema.findById(id)
        if (!foundedAutor) {
            logger.info("ebook not found" + id)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await EbookSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info("DeleteEbook success")

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}


module.exports = {
    getOneEbook,
    postEbook,
    DeleteEbook,
}