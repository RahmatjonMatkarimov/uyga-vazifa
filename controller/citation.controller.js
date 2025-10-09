const CitationSchema = require("../schema/ctation.schema")

const postCitation = async (req, res) => {
    try {
        const {
            book_id,
            desc
        } = req.body

        await CitationSchema.create({
            book_id,
            desc
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

const DeleteCitation = async (req, res) => {
    try {
        const { id } = req.params
        const foundedCitation = await CitationSchema.findById(id)
        if (!foundedCitation) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await CitationSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getCitations = async (req, res) => {
    try {
        const Citations = await CitationSchema.find().populate("author_info")
        res.status(200).json({
            Citations
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}


const putCitation = async (req, res) => {
    try {
        const { id } = req.params
        const {
            book_id,
            desc
        } = req.body

        const foundedCitation = await CitationSchema.findById(id)
        if (!foundedCitation) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await CitationSchema.findByIdAndUpdate(id, {
            book_id,
            desc
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

module.exports = {
    DeleteCitation,
    getCitations,
    postCitation,
    putCitation
}