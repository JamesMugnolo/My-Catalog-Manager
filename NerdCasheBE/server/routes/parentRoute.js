require("dotenv").config();
const express = require("express");
const users = require("./Users");
const videogames = require("./Videogames");
const movies = require("./Movies");
const books = require("./Books");
const verifyJWT = require("../middleware/verifyJWT.js");
let router = express.Router();
const cors = require("cors");
const { credentials, corsOptions } = require("../middleware/verifyOrigin.js");
router.use(credentials);
router.use(cors(corsOptions));

router.use("/Users", users);
router.use(verifyJWT);
router.use("/Games", videogames);
router.use("/Movies", movies);
router.use("/Books", books);

module.exports = router;
