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
//On my computer the optimal number of rounds is 11 when salting a password that is 20 chars long.
//The optimal # of rounds should be close to 250ms for normal users and the optimal password is between 14-16 chars
//So my testing with using console.time() and salting with a password of 20 chars resulted in the optimal # of rounds
//being 11. 12 rounds is over by about 50ms but doable if i want the app to be more secure.
const saltRounds = 11;

//EX code for rounds
//------------------------------
// psw = "s$cr3T12345678912345";
// for (i = 1; 1 < 15; i++) {
//   console.time(`${i} rounds`);
//   const hashedPwd = await bcrypt.hash(psw, i);
//   console.timeEnd(`${i} rounds`);
// }
//------------------------------------------
//router.use(cors({ origin: "https://jamesmugnoloportfolio.netlify.app" }));
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
        console.log("errpr");
        return res.sendStatus(403);
      }
      removeRefreshToken(decoded.username);
    });
    return res.sendStatus(204);
  } else {
    const username = req.body.username;
    removeRefreshToken(username);
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
  } catch (err) {
    console.log(err);
  }
});
function createJWTToken(res, username) {
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
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
  console.log(password);
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  const querySuccessful = await insertUser(username, hashedPwd);
  if (!querySuccessful)
    res.status(403).send({ message: "Username Unavailable" });
  const accessToken = createJWTToken(res, username);
  res.status(200).json({ accessToken });
});

module.exports = router;
