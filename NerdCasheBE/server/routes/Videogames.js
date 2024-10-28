const express = require("express");
let router = express.Router();
const igdbClient = require("../config/igdbConfig");
let cors = require("cors");
require("dotenv").config();
const {
  insertGame,
  insertConsole,
  insertPublisher,
  insertGameConsole,
  insertGamePublisher,
  insertUserGame,
  getGameID,
  getUserGames,
  getConsoles,
  getPublishers,
  deleteGame,
} = require("../../database/Videogames/videogame_commands.js");
const { getUserID } = require("../../database/Users/user_db_commands.js");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.get("/external/:title", async function (req, res) {
  const client = await igdbClient();

  const response = await client
    .fields(
      "id,name,rating,rating_count,first_release_date,involved_companies.company.name,cover.url,platforms.name,storyline"
    )
    .limit(100)
    .search(`${req.params.title}`)
    .where("rating != null & cover != null & first_release_date != null;")
    .request("/games")
    .catch((err) => {
      throw new Error(`unable to get results from Twitch: ${err}`);
    });
  const formattedData = FormatVideogameData(response.data).sort(
    (game1, game2) => {
      if (game1.name > game2.name) return 1;
      if (game1.name < game2.name) return -1;
    }
  );
  res.json(formattedData);
});
function FormatConsoleTitles(title) {
  if (title.includes("Nintendo Entertainment System")) {
    if (title.includes("Super")) return "SNES";
    else return "NES";
  } else if (title.includes("Family Computer")) {
    return "Famicom";
  } else if (title.includes("Nintendo64")) {
    return "N64";
  } else if (title.includes("Nintendo")) {
    return title.replace("Nintendo", "");
  } else if (title.includes("PC")) {
    return "PC";
  } else if (title.includes("PlayStation")) {
    return title.replace("PlayStation", "PS");
  } else if (
    title.includes("Game Boy Advance") | title.includes("Game Boy Color")
  ) {
    return title.replace("Game Boy", "GB");
  } else {
    return title;
  }
}
function FormatVideogameData(data) {
  var formattedData = [];
  for (const entry of data) {
    const id = entry.id;
    const name = entry.name;
    const rating = Math.round(entry.rating);
    const release_date = entry.first_release_date * 1000;
    const image_url =
      "https:" + entry.cover.url.replace("t_thumb", "t_cover_big");
    const description = entry.storyline;

    let platforms = [];
    for (const platform of entry.platforms) {
      platforms.push(FormatConsoleTitles(platform.name));
    }
    platforms = platforms.filter(
      (value, index) => platforms.indexOf(value) === index
    );

    let companies = [];
    if (entry.involved_companies != undefined) {
      for (const studio of entry.involved_companies) {
        companies.push(studio.company.name);
      }
    }
    const formattedGame = {
      id,
      name,
      rating,
      release_date,
      image_url,
      description,
      companies,
      platforms,
    };
    formattedData.push(formattedGame);
  }
  return formattedData;
}
router.delete("/internal/", async function (req, res) {
  let queryResults;
  let deletedUserGameIds = [];

  console.log(req.body.username);
  const result = await getUserID(req.body.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  for (game of req.body.items) {
    const gameID = await getGameID(game.id);
    const wasRemoved = await deleteGame(gameID);
    if (wasRemoved) {
      deletedUserGameIds.push(game.id);
      console.log(game.name + " was removed");
    }
  }

  res.json({
    deletedUserItemIds: deletedUserGameIds,
  });
});

router.get("/internal", async function (req, res) {
  const result = await getUserID(req.query.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  const userID = result.rows[0].id;
  console.log(userID);
  let games = await getUserGames(userID);

  for (let index = 0; index < games.length; index++) {
    games[index].platforms = await getConsoles(games[index].id);
    games[index].companies = await getPublishers(games[index].id);
  }
  console.log(games);
  res.json({
    userItems: games,
  });
});
router.post("/internal", async function (req, res) {
  let queryResults;
  let insertedUserGameIds = [];

  console.log(req.body.username);
  const result = await getUserID(req.body.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }
  const userID = result.rows[0].id;

  for (game of req.body.items) {
    queryResults = await insertGame(game);
    const gameID = queryResults.id;

    if (queryResults.wasDuplicate === false) {
      await insertConsoleList(game.platforms, gameID, queryResults);
      await insertPublisherList(game.companies, gameID, queryResults);
    }

    queryResults = await insertUserGame(userID, gameID);
    if (queryResults.wasDuplicate === false) {
      insertedUserGameIds.push(game.id);
    }
  }
  console.log(insertedUserGameIds);
  res.json({
    insertedUserItemIds: insertedUserGameIds,
  });
});
async function insertConsoleList(consoles, gameID, queryResults) {
  console.log(consoles);
  for (gameConsole of consoles) {
    console.log(gameConsole);
    queryResults = await insertConsole(gameConsole);
    console.log(queryResults.id);
    await insertGameConsole(queryResults.id, gameID);
  }
}
async function insertPublisherList(publishers, gameID, queryResults) {
  for (publisher of publishers) {
    queryResults = await insertPublisher(publisher);
    await insertGamePublisher(queryResults.id, gameID);
  }
}
module.exports = router;
