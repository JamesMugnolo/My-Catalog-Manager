const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || authHeader === undefined)
    return res.status(401).send("Session Expired");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.username = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
