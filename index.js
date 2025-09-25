const express = require("express");
const cors = require("cors");
const authRouter = require("./router/auth.routes");
const listRouter = require("./router/ToDo.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({ origin: "*" }));

/////////router
app.use(authRouter)
app.use(listRouter)

app.listen(PORT, () => {
  console.log("backent ishladi " + PORT + " Portda");
});
