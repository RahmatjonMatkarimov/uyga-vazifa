const EbookSchema = require("../schema/ebook.schema")

const postEbook = async (req, res) => {
    try {
        const {
            book_id, author_id, ebook_id
        } = req.body

        await EbookSchema.create({
            book_id, author_id, ebook_id
        })

        res.status(201).json({
            massage: "bajarildi"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getOneEbook = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await EbookSchema.find({ book_id: id })
        if (!foundedAutor) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }
        res.status(200).json({
            foundedAutor
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const DeleteEbook = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await EbookSchema.findById(id)
        if (!foundedAutor) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await EbookSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
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