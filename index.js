const express = require("express");
const authRouter = require("./router/auth.routes");
const productRouter = require("./router/products.routess");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(authRouter)
app.use(productRouter)

app.listen(PORT, () => {
  console.log("backent ishladi " + PORT + " Portda");
});
