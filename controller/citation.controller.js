const CitationSchema = require("../schema/ctation.schema")
const logger = require("../utils/logger")

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

        logger.info(`postCitation succues. data ----- book_id:${book_id}, desc:${desc}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`postCitation error ------ ${err}`)
    }
}

const DeleteCitation = async (req, res) => {
    try {
        const { id } = req.params
        const foundedCitation = await CitationSchema.findById(id)
        if (!foundedCitation) {
            logger.info(`DeleteCitation ------- Citation not found. id:${id}`)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await CitationSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info(`DeleteCitation succues ---- id:${id}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`DeleteCitation error ------ ${err}`)
    }
}
const getCitations = async (req, res) => {
    try {
        const Citations = await CitationSchema.find().populate("author_info")
        res.status(200).json({
            Citations
        })
        logger.info(`getCitations succues ---- id:${id}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`getCitations error ------ ${err}`)
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
            logger.info(`putCitation ------- Citation not found. id:${id}`)
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
        logger.info(`putCitation succues. data ----- book_id:${book_id}, desc:${desc}`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`putCitation error ------ ${err}`)
    }
}

module.exports = {
    DeleteCitation,
    getCitations,
    postCitation,
    putCitation
}