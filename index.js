const express = require("express");
const productRouter = require("./router/products.routess");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(productRouter);

app.listen(PORT, () => {
  console.log("backent ishladi " + PORT + " Portda");
});
