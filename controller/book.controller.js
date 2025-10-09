const bookSchema = require("../schema/book.schema")

const postbook = async (req, res) => {
    try {
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

        await bookSchema.create({
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

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getOnebook = async (req, res) => {
    try {
        const id = req.params.id
        const foundedBook = await bookSchema.findById(id)
        if (!foundedBook) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }
        res.status(200).json({
            foundedBook
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const Deletebook = async (req, res) => {
    try {
        const { id } = req.params
        const foundedBook = await bookSchema.findById(id)
        if (!foundedBook) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await bookSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getbooks = async (req, res) => {
    try {
        const books = await bookSchema.find().populate("author_info")
        res.status(200).json({
            books
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

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

    } catch (err) {
        res.status(500).json({
            massage: err
        })

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
    } catch (err) {
        res.status(500).json({
            massage: err
        })

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