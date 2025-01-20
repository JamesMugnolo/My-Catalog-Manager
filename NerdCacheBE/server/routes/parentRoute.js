const express = require("express");
const users = require("./Users.js");
const videogames = require("./Videogames.js");
const movies = require("./Movies.js");
const books = require("./Books.js");
const verifyJWT = require("../middleware/verifyJWT.js");
let router = express.Router();

router.use("/Users", users);
router.use(verifyJWT);
router.use("/Games", videogames);
router.use("/Movies", movies);
router.use("/Books", books);

module.exports = router;
