const { Router } = require("express");
const { getCitations, DeleteCitation, postCitation, putCitation } = require("../controller/citation.controller");
const CitationRouter = Router();


CitationRouter.get("/Citation", getCitations)
CitationRouter.post("/Citation", postCitation)
CitationRouter.delete("/Citation/:id", DeleteCitation)
CitationRouter.put("/Citation/:id", putCitation)

module.exports = CitationRouter;
