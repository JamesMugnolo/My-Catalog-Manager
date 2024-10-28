const dbconfig = require("../../database/db.js");
const pool = dbconfig.pool;

let queryResults = { id: null, successful: false };

exports.getPassword = async function (username) {
  const result = await pool.query(
    "SELECT password FROM nerd_cashe_user WHERE username = $1",
    [username]
  );
  return result;
};
exports.getUserID = async function (username) {
  const result = await pool.query(
    "SELECT id FROM nerd_cashe_user WHERE username = $1",
    [username]
  );
  return result;
};
exports.insertUser = async function (username, hashedPwd) {
  await pool
    .query("INSERT INTO nerd_cashe_user (username,password) VALUES ($1,$2)", [
      username,
      hashedPwd,
    ])
    .then((res) => {
      queryResults.successful = true;
      console.log("in success: ", queryResults.successful);
    })
    .catch((err) => {
      console.log("in err: ", queryResults.successful);
      queryResults.successful = false;
    });
  console.log("about to return: ", queryResults.successful);
  return queryResults.successful;
};
