const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRouter = require("./server/routes/parentRoute");
const { createConnection } = require("mongoose");
const app = express();
const verifyJWT = require("./server/middleware/verifyJWT.js");
//const pool = require("./database/db");
const dbconfig = require("./database/db.js");
const db = dbconfig.db;

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {
  credentials,
  corsOptions,
} = require("./server/middleware/verifyOrigin.js");
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use("/api", apiRouter);

app.get("/setup", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  db.runMigrations();
});
