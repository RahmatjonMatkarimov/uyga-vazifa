const express = require("express");
const cors = require("cors");
const connect = require("./config/mangodb");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const CitationRouter = require("./router/citation.routes");
const eBookRouter = require("./router/ebook.routes");
const aBookRouter = require("./router/abook.routes");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth.routes");
const logger = require("./utils/logger");
const swigger = require('swagger-ui-express')
const YAML = require("yamljs")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const swiggerDocs = YAML.load("./doc/documentation.yml")
app.use("/docs",swigger.serve,swigger.setup(swiggerDocs))

app.use(authorRouter);
app.use(bookRouter);
app.use(CitationRouter);
app.use(eBookRouter);
app.use(aBookRouter);
app.use(authRouter)

app.get("/", (req, res) => res.status(200).json({ massage: "ishladi" }))

connect()

app.listen(PORT, () => {
  logger.info("Backend ishladi " + PORT + " Portda");
});
