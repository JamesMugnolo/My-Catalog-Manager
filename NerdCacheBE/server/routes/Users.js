const express = require("express");
const {
  getPassword,
  insertUser,
  setRefreshToken,
  findByToken,
  removeRefreshToken,
} = require("../../database/Users/user_db_commands.js");
let router = express.Router();
const bcrypt = require("bcrypt");
router.use(express.json());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const { credentials, corsOptions } = require("../middleware/verifyOrigin.js");
router.use(credentials);
router.use(cors(corsOptions));
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const saltRounds = 11;

router.get("/refresh", async (req, res) => {
  const cookies = req.headers.cookie;
  if (!cookies) return res.status(401).send("Session Expired");
  const refToken = cookies.split("=")[1];
  const result = await findByToken(refToken);

  if (result.rowCount == 0) return res.sendStatus(403);
  jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || result.rows[0].username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    return res.json({ accessToken });
  });
});

router.post("/logout", async function (req, res) {
  const cookies = req.headers.cookie;
  if (cookies?.jwt !== undefined) {
    const refToken = cookies.split("=")[1];
    const result = await findByToken(refToken);

    if (result.rowCount == 0) return res.sendStatus(403);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || result.rows[0].username !== decoded.username) {
        return res.sendStatus(403);
      }
      removeRefreshToken(decoded.username);
    });
    return res.sendStatus(204);
  } else {
    removeRefreshToken(req.username);
    return res.sendStatus(204);
  }
});

router.get("/", async function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  try {
    const result = await getPassword(username);

    if (result.rowCount == 0)
      res.status(401).send({ message: "Login Unsuccessful" });

    if (bcrypt.compare(password, result.rows[0].password) == false)
      res.status(401).send({ message: "Login Unsuccessful" });

    const accessToken = createJWTToken(res, username);

    res.status(200).json({ accessToken });
  } catch (err) {}
});
function createJWTToken(res, username) {
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { username: username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  setRefreshToken(username, refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });

  return accessToken;
}
router.put("/", async function (req, res) {
  username = req.body.username;
  password = req.body.password;
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  const querySuccessful = await insertUser(username, hashedPwd);
  if (!querySuccessful)
    res.status(403).send({ message: "Username Unavailable" });
  const accessToken = createJWTToken(res, username);
  res.status(200).json({ accessToken });
});

module.exports = router;
