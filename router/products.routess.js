const { Router } = require("express");
const {
  getProducts,
  getOneProducts,
  putProducts,
  PostProducts,
  DeleteProducts,
} = require("../controller/products.ctr");

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/product/:id", getOneProducts);
productRouter.post("/product-update/:id", putProducts);
productRouter.post("/product-delete/:id", DeleteProducts);
productRouter.post("/products/", PostProducts);

module.exports = productRouter;
