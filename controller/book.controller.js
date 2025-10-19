const bookSchema = require("../schema/book.schema")
const logger = require("../utils/logger")

const postbook = async (req, res) => {
    try {
        const {
            title,
            periot,
            desc,
            page,
            published_year,
            ganre,
            published_home,
        } = req.body

        await bookSchema.create({
            title,
            periot,
            img: req.file.filename,
            desc,
            page,
            published_year,
            ganre,
            published_home,
        })

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info(`book created succuess, data ----- title:${title}, published_year:${published_year}, published_home${published_home}, periot:${periot}, img:${req.file.filename}, ganre:${ganre}, desc:${desc}, page:${page}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`postbook error ------ ${err}`)
    }
}
const getOnebook = async (req, res) => {
    try {
        const id = req.params.id
        const foundedBook = await bookSchema.findById(id).populate("author_info").populate("Citaions")
        if (!foundedBook) {
            logger.info(`getOnebook ------- book not found. id:${id}`)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }
        res.status(200).json({
            foundedBook
        })
        logger.info(`getOnebook succuess. id:${id}`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`getOnebook error ------ ${err}`)
    }
}
const Deletebook = async (req, res) => {
    try {
        const { id } = req.params
        const foundedBook = await bookSchema.findById(id)
        if (!foundedBook) {
            logger.info(`Deletebook ------- book not found. id:${id}`)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await bookSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info(`Deletebook succuess. id:${id}`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`Deletebook error ------ ${err}`)
    }
}
const getbooks = async (req, res) => {
    try {
        const books = await bookSchema.find().populate("author_info").populate("Citaions")
        res.status(200).json({
            books
        })
        logger.info(`get books succuess`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`getbooks error ------ ${err}`)
    }
}

const search = async (req, res) => {
    try {
        const quary = req.quary
        const authors = await authorSchema.find({
            fullneme: { $regex: quary.name, $options: "i" }
        })
        res.status(200).json({
            authors
        })
        logger.info(`books searching succuess ------ quary:${quary}`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`book search error ------ ${err}`)
    }
}

const putbook = async (req, res) => {
    try {
        const { id } = req.params
        const {
            title,
            periot,
            img,
            desc,
            page,
            published_year,
            ganre,
            published_home,
        } = req.body

        const foundedBook = await bookSchema.findById(id)
        if (!foundedBook) {
            logger.info(`putbook ------- book not found. id:${id}`)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await bookSchema.findByIdAndUpdate(id, {
            title,
            periot,
            img,
            desc,
            page,
            published_year,
            ganre,
            published_home,
        })

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info(`book updated succuess, data ----- title:${title}, published_year:${published_year}, published_home${published_home}, periot:${periot}, img:${req.file.filename}, ganre:${ganre}, desc:${desc}, page:${page}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`putbook error ------ ${err}`)
    }
}

module.exports = {
    Deletebook,
    getOnebook,
    getbooks,
    postbook,
    search,
    putbook
}