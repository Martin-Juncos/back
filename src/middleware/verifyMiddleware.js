const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(404).send("Token requerido");
  }
  jwt.verify(token, "my_secret_key", (err, decode) => {
    if (err) {
      return res.status(401).send("token invalido");
    }
    req.user = decode;
    next();
  });
};

module.exports = verifyToken;
