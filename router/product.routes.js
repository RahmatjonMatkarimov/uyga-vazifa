const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { postProduct, putProduct, getProducts } = require("../controller/products.controller");

const productRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../upload/images")); 
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

productRouter.post("/product/:category", upload.single("img"), postProduct);
productRouter.put("/product/:id",putProduct)
productRouter.get("/product/:category",putProduct)
productRouter.get("/product/:category",putProduct)
productRouter.get("/products",getProducts)


module.exports = productRouter;
