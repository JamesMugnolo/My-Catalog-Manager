const express = require("express");
let router = express.Router();
const axios = require("axios");

const {
  insertMovie,
  insertDirector,
  insertCastMember,
  insertMovieCastMember,
  insertMovieDirector,
  insertUserMovie,
  deleteMovie,
  getMovieID,
  getDirectors,
  getMovieCast,
  getUserMovies,
} = require("../../database/Movies/movie_commands.js");
const { getUserID } = require("../../database/Users/user_db_commands.js");

function getExternalAxiosConfig(collection, key) {
  var url = "";

  if (collection[0] == "search")
    url = `https://api.themoviedb.org/3/search/${collection[1]}?api_key=${process.env.THEMOVIEDB_KEY}&query=${key}&language=en-US`;
  else if (collection[0] == "movie")
    url = `https://api.themoviedb.org/3/${collection[0]}/${key}?language=en-US&api_key=${process.env.THEMOVIEDB_KEY}`;
  else if (collection[0] == "credits")
    url = `https://api.themoviedb.org/3/movie/${key}/credits?language=en-US&api_key=${process.env.THEMOVIEDB_KEY}`;
  else return;

  return {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
  };
}
router.get("/external/:title", async function (req, res) {
  let ItemIds = [];
  let formattedItems = [];
  //grabs all the movie Ids from TMDB
  await axios
    .request(getExternalAxiosConfig(["search", "movie"], req.params.title))
    .then((response) => {
      for (const item of response.data.results) {
        ItemIds.push({ id: item.id, type: item.media_type });
      }
    });

  //for every ItemID
  let TMDBEndpoints1 = [];
  for (const item of ItemIds) {
    TMDBEndpoints1.push(
      axios.request(getExternalAxiosConfig(["credits", item.type], item.id))
    );
    TMDBEndpoints1.push(
      axios.request(getExternalAxiosConfig(["movie"], item.id))
    );
  }

  await Promise.all(TMDBEndpoints1).then((response) => {
    let directors = [];
    let tempDirectors = [];
    let cast = [];
    let movieData = {};

    for (const item of response) {
      if (item.data.title == undefined) {
        tempDirectors = item.data.crew.filter((member) => {
          return member.job === "Director";
        });

        directors = tempDirectors.reduce(
          (tempDirectors, currentMember) => [
            ...tempDirectors,
            currentMember.name,
          ],
          []
        );

        cast = item.data.cast
          .filter(
            ({ known_for_department }) => known_for_department === "Acting"
          ) //filter the array to get just  the acting department
          .reduce(
            (castArray, currentMember) => [...castArray, currentMember.name],
            []
          ); // reduce the actor array of objects to an array of names
      } else {
        movieData = item.data;
      }
      if (
        (directors != []) &
        (cast.length != 0) &
        (Object.keys(movieData).length != 0) &
        (movieData.poster_path != null)
      ) {
        formattedItems.push(formatItemData(movieData, directors, cast));
        directors = "";
        cast = [];
        movieData = {};
      }
    }
  });
  res.json(formattedItems);
});
function formatItemData(item, directors, cast) {
  formattedItem = {
    id: item.id,
    name: item.original_title,
    rating: Math.round(item.vote_average * 10), //vote_average is given in decimal form
    release_date: new Date(item.release_date),
    image_url: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    description: item.overview,
    directors: directors,
    cast: cast,
    runtime: item.runtime,
  };

  return formattedItem;
}

router.delete("/internal/", async function (req, res) {
  let deletedUserMovieIds = [];

  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  for (movie of req.body.items) {
    const movieID = await getMovieID(movie.id);
    const wasRemoved = await deleteMovie(movieID);
    if (wasRemoved) {
      deletedUserMovieIds.push(movie.id);
    }
  }

  res.json({
    deletedUserItemIds: deletedUserMovieIds,
  });
});

router.get("/internal", async function (req, res) {
  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  const userID = result.rows[0].id;

  let movies = await getUserMovies(userID);

  for (let index = 0; index < movies.length; index++) {
    movies[index].director = await getDirectors(movies[index].id);
    movies[index].cast = await getMovieCast(movies[index].id);
  }
  res.json({
    userItems: movies,
  });
});
router.post("/internal", async function (req, res) {
  let queryResults;
  let insertedUserMovieIds = [];

  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }
  const userID = result.rows[0].id;
  for (movie of req.body.items) {
    queryResults = await insertMovie(movie);
    const movieID = queryResults.id;

    if (queryResults.wasDuplicate === false) {
      await insertDirectorList(movie.directors, movieID, queryResults);
      await insertCastList(movie.cast, movieID, queryResults);
    }

    queryResults = await insertUserMovie(userID, movieID);
    if (queryResults.wasDuplicate === false) {
      insertedUserMovieIds.push(movie.id);
    }
  }
  res.json({
    insertedUserItemIds: insertedUserMovieIds,
  });
});
async function insertDirectorList(directors, movieID, queryResults) {
  for (const director of directors) {
    queryResults = await insertDirector(director);
    await insertMovieDirector(queryResults.id, movieID);
  }
}
async function insertCastList(cast, movieID, queryResults) {
  for (const member of cast) {
    queryResults = await insertCastMember(member);
    await insertMovieCastMember(queryResults.id, movieID);
  }
}
module.exports = router;
