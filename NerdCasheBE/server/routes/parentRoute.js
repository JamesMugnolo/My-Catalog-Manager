require("dotenv").config();
const express = require("express");
const users = require("./Users");
const videogames = require("./Videogames");
const movies = require("./Movies");
const books = require("./Books");

let router = express.Router();

router.use("/Users", users);
router.use("/Games", videogames);
router.use("/Movies", movies);
router.use("/Books", books);

module.exports = router;
