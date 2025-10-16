const authorSchema = require("../schema/authon.schema")

const postauthor = async (req, res) => {
    try {
        const {
            fullneme,
            bith_date,
            death_date,
            periot,
            bio,
            creativite,
            region,
        } = req.body

        await authorSchema.create({
            fullneme,
            bith_date,
            death_date,
            periot,
            img: req.file.filename,
            bio,
            creativite,
            region,
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
const getOneauthor = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await authorSchema.findById(id).populate("books")
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
const Deleteauthor = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await authorSchema.findById(id)
        if (!foundedAutor) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await authorSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getauthors = async (req, res) => {
    try {
        const authors = await authorSchema.find().populate("books")
        res.status(200).json({
            authors
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

const putauthor = async (req, res) => {
    try {
        const { id } = req.params
        const {
            fullneme,
            bith_date,
            death_date,
            periot,
            bio,
            creativite,
            region,
        } = req.body

        const foundedAutor = await authorSchema.findById(id)
        if (!foundedAutor) {
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await authorSchema.findByIdAndUpdate(id, {
            fullneme,
            bith_date,
            death_date,
            periot,
            img: req.file.filename,
            bio,
            creativite,
            region,
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
    Deleteauthor,
    getOneauthor,
    getauthors,
    postauthor,
    putauthor,
    search
}