const multer = require("multer")
const path = require("path")
const { read_file, write_file } = require("../utils/file_managment")
const { v4 } = require("uuid")

const postProduct = async (req, res) => {
    try {
        const { category } = req.params
        const { title } = req.body

        if (!category || !title) {
            return req.status(400).json({
                massage: "barcha malumotlarni kiriting"
            })
        }

        const data = read_file("data")

        data.push({
            title,
            id: v4(),
            category,
            img_filePath: `http://localhost:3000/${req.file.filename}`
        })

        write_file("data", data)

        res.status(201).json({
            massage: "yaratildi"
        })

    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getProducts = async (req, res) => {
    try {
        const data = read_file("data")
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const putProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, category } = req.body
        const data = read_file("data")

        data.forEach(item => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.category = category ? category : item.category
            }
        });

        write_file("data", data)

        res.status(201).json({
            massage: "yaratildi"
        })
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}
const getcotegory = async (req, res) => {
    try {
        const data = read_file("data")
        const { category } = req.params

        const filteredData = data.filter((item) => item.category === category)

        res.status(200).json(filteredData)
    } catch (err) {
        res.status(500).json({
            massage: err
        })

    }
}

module.exports = {
    postProduct,
    getProducts,
    getcotegory,
    putProduct
}