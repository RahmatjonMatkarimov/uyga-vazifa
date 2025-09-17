const { Router } = require("express");
const {
  getProducts,
  getOneProducts,
  putProducts,
  PostProducts,
  DeleteProducts,
} = require("../controller/products.ctr");
const authMiddleWare = require("../middleware/auth.middleWare");

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getOneProducts);
productRouter.put("/products/:id",authMiddleWare, putProducts);
productRouter.delete("/products/:id",authMiddleWare, DeleteProducts);
productRouter.post("/products/", authMiddleWare, PostProducts);

module.exports = productRouter;
