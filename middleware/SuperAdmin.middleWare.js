const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        massage: "token not found",
      });
    }
    const bearer = token.split(" ")[0];
    const access_token = token.split(" ")[1];
    if (bearer !== "Bearer" || !access_token) {
      return res.status(400).json({
        massage: "invalit token",
      });
    }
    const decode = jwt.verify(access_token, process.env.SECRET_KEY);
    req.user = decode;
    if (req.user.role === "superAdmin") {
      next();
    } else {
      return res.status(401).json({
        massage: "huquqingiz yoq",
      });
    }
  } catch (error) {
    res.status(400).json({
      massage: error,
    });
  }
};
