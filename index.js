const express = require("express");
const cors = require("cors");
const connect = require("./config/mangodb");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(authorRouter);
app.use(bookRouter);

connect()

app.listen(PORT, () => {
  console.log("Backend ishladi " + PORT + " Portda");
});
