const express = require("express");
const {
  getPassword,
  insertUser,
} = require("../../database/Users/user_db_commands.js");
let router = express.Router();
let cors = require("cors");
const bcrypt = require("bcrypt");
const basicAuth = require("basic-auth");
router.use(express.json());
require("dotenv").config();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

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

router.get("/", async function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  try {
    const result = await getPassword(username);

    if (result.rowCount == 0)
      res.status(401).send({ message: "Login Unsuccessful" });

    if (bcrypt.compare(password, result.rows[0].password) == false)
      res.status(401).send({ message: "Login Unsuccessful" });

    res.status(200).send({ message: "Login Successful" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", async function (req, res) {
  username = req.body.username;
  password = req.body.password;
  console.log(password);
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  const querySuccessful = await insertUser(username, hashedPwd);
  console.log(querySuccessful);
  if (querySuccessful)
    res.status(200).send({ message: "Successfully Created User" });
  else res.status(403).send({ message: "Username Taken" });
});

module.exports = router;
