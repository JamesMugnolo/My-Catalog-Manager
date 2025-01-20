const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  credentials,
  corsOptions,
} = require("./server/middleware/verifyOrigin.js");
const apiRouter = require("./server/routes/parentRoute.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const dbconfig = require("./database/db.js");
const db = dbconfig.db;
app.use(bodyParser.json());

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/setup", async (req, res) => {
  try {
  } catch (err) {
    res.sendStatus(500);
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  db.runMigrations();
});
