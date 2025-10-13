const audioSchema = require("../schema/abook.schema")

const postAudio = async (req, res) => {
    try {
        const {
            book_id, author_id
        } = req.body

        await audioSchema.create({
            book_id, author_id, audio_url: req.file
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
const getOneAudio = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await audioSchema.find({ book_id: id })
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
const DeleteAudio = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await AudioSchema.findById(id)
        if (!foundedAutor) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await AudioSchema.findByIdAndDelete(id)

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
    getOneAudio,
    postAudio,
    DeleteAudio,
}