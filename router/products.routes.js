const { Router } = require("express");
const {
  getProducts,
  getOneProducts,
  putProducts,
  PostProducts,
  DeleteProducts,
} = require("../controller/products.controller");
const productsMiddleWare = require("../middleware/products.middleWare");
const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getOneProducts);
productRouter.post("/products", productsMiddleWare, PostProducts);
productRouter.put("/products/:id", productsMiddleWare, putProducts);
productRouter.delete("/products/:id", productsMiddleWare, DeleteProducts);

module.exports = productRouter;
