const authorSchema = require("../schema/authon.schema")
const logger = require("../utils/logger")

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

        logger.info(`author created succuess, data ----- fullneme:${fullneme}, bith_date:${bith_date}, death_date${death_date}, periot:${periot}, img:${req.file.filename}, creativite:${creativite}, region:${region}`)

    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`postauthor error ------ ${err}`)
    }
}
const getOneauthor = async (req, res) => {
    try {
        const id = req.params.id
        const foundedAutor = await authorSchema.findById(id).populate("books")
        if (!foundedAutor) {
            logger.info(`get one author ------- author not found id:${id}`)
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
        logger.error(`getOneauthor error ------ ${err}`)
    }
}
const Deleteauthor = async (req, res) => {
    try {
        const { id } = req.params
        const foundedAutor = await authorSchema.findById(id)
        if (!foundedAutor) {
            logger.info(`delete author ------- author not found id:${id}`)
            return res.status(404).json({
                massage: "mavjud emas"
            })
        }

        await authorSchema.findByIdAndDelete(id)

        res.status(201).json({
            massage: "bajarildi"
        })
        logger.info(`author delete succuess id:${id}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`Deleteauthor error ------ ${err}`)
    }
}
const getauthors = async (req, res) => {
    try {
        const authors = await authorSchema.find().populate("books")
        res.status(200).json({
            authors
        })
        logger.info(`get authors succuess`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`getauthors error ------ ${err}`)
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
        logger.info(`author search succuess ------ quary:${quary}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`author search error ------ ${err}`)
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
            logger.info(`put author ------- author not found id:${id}`)
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
        logger.info(`author updated succuess, data ----- fullneme:${fullneme}, bith_date:${bith_date}, death_date${death_date}, periot:${periot}, img:${req.file.filename}, creativite:${creativite}, region:${region}`)
    } catch (err) {
        res.status(500).json({
            massage: err
        })
        logger.error(`update author error ------ ${err}`)
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