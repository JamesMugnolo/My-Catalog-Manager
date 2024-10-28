const dbconfig = require("../../database/db.js");
const pool = dbconfig.pool;

let queryResults = { id: null, wasDuplicate: false };

getPublisherId = async function (publisher) {
  const id = await pool
    .query("SELECT id FROM gamePublisher WHERE name = $1", [publisher])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
};

getConsoleID = async function (console) {
  const id = await pool
    .query("SELECT id FROM console WHERE name = $1", [console])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
};

const getGameID = (exports.getGameID = async function (external_game_id) {
  const id = await pool
    .query("SELECT id FROM game WHERE game.external_game_id = $1", [
      external_game_id,
    ])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
});

exports.getUserGames = async function (user_id) {
  const user_games = await pool
    .query(
      "SELECT external_game_id AS id, name, release_date, image_url, storyline AS description, rating FROM game INNER JOIN user_game on game.id = user_game.game_id INNER JOIN nerd_cashe_user ON nerd_cashe_user.id = user_game.user_id WHERE nerd_cashe_user.id = $1",
      [user_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
  return user_games;
};

exports.getConsoles = async function (external_game_id) {
  const gameConsoles = await pool
    .query(
      "SELECT console.name FROM console INNER JOIN game_console on console.id = game_console.console_id INNER JOIN game ON game.id = game_console.game_id WHERE game.external_game_id = $1",
      [external_game_id]
    )
    .then((res) => {
      let results = [];
      for (consoles of res.rows) {
        results.push(consoles.name);
      }
      return results;
    })
    .catch((err) => {});
  return gameConsoles;
};
exports.getPublishers = async function (external_game_id) {
  const gamePublishers = await pool
    .query(
      "SELECT gamePublisher.name FROM gamePublisher INNER JOIN game_gamePublisher on gamePublisher.id = game_gamePublisher.publisher_id INNER JOIN game ON game.id = game_gamePublisher.game_id WHERE game.external_game_id = $1",
      [external_game_id]
    )
    .then((res) => {
      let results = [];
      for (publishers of res.rows) {
        results.push(publishers.name);
      }
      return results;
    })
    .catch((err) => {});
  return gamePublishers;
};
exports.insertGame = async function (game) {
  await pool
    .query(
      "INSERT INTO game (external_game_id,name,rating,release_date,image_url,storyline)" +
        "VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;",
      [
        Number(game.id),
        game.name,
        Number(game.rating),
        Number(game.release_date),
        game.image_url,
        game.description,
      ]
    )
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getGameID(game.id);
      queryResults.wasDuplicate = true;
    });
  console.log();
  return queryResults;
};

exports.insertConsole = async function (console1) {
  await pool
    .query("INSERT INTO console (name) VALUES ($1) RETURNING id", [console1])
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getConsoleID(console1);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};

exports.insertPublisher = async function (publisher) {
  await pool
    .query("INSERT INTO gamePublisher (name) VALUES ($1) RETURNING id", [
      publisher,
    ])
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getPublisherId(publisher);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};
exports.insertGameConsole = async function (console_id, game_id) {
  await pool.query(
    "INSERT INTO game_console ( game_id,console_id) VALUES ($1,$2)",
    [game_id, console_id]
  );
};
exports.insertGamePublisher = async function (publisher_id, game_id) {
  console.log(publisher_id + " : " + game_id);
  await pool.query(
    "INSERT INTO game_gamePublisher ( game_id,publisher_id) VALUES ($1,$2)",
    [game_id, publisher_id]
  );
};
exports.insertUserGame = async function (user_id, game_id) {
  await pool
    .query("INSERT INTO user_game (game_id,user_id) VALUES ($1,$2)", [
      game_id,
      user_id,
    ])
    .then((res) => {
      queryResults.wasDuplicate = false;
    })
    .catch((err) => {
      queryResults.wasDuplicate = true;
    });
  id = null;
  return queryResults;
};
exports.deleteGame = async function (gameID) {
  let wasDeleted = false;
  console.log(gameID);
  await pool
    .query("DELETE FROM user_game WHERE game_id = $1", [gameID])
    .then((res) => {
      console.log(res.count);
      wasDeleted = true;
    })
    .catch((err) => {
      wasDeleted = false;
    });
  return wasDeleted;
};
