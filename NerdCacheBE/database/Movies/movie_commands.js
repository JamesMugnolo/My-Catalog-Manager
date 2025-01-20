const dbconfig = require("../db.js");
const pool = dbconfig.pool;

let queryResults = { id: null, wasDuplicate: false };

getCastMemberId = async function (castMember) {
  const id = await pool
    .query("SELECT id FROM castMember WHERE name = $1", [castMember])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
};

getDirectorID = async function (director) {
  const id = await pool
    .query("SELECT id FROM director WHERE name = $1", [director])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
};

const getMovieID = (exports.getMovieID = async function (external_movie_id) {
  const id = await pool
    .query("SELECT id FROM movie WHERE movie.external_movie_id = $1", [
      external_movie_id,
    ])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
});

exports.getUserMovies = async function (user_id) {
  const user_movies = await pool
    .query(
      "SELECT external_movie_id AS id, name, release_date, image_url, storyline AS description, rating, runtime FROM movie INNER JOIN user_movie on movie.id = user_movie.movie_id INNER JOIN nerd_cashe_user ON nerd_cashe_user.id = user_movie.user_id WHERE nerd_cashe_user.id = $1",
      [user_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
  return user_movies;
};

exports.getMovieCast = async function (external_movie_id) {
  const movieCast = await pool
    .query(
      "SELECT castMember.name FROM castMember INNER JOIN movie_castMember on castMember.id = movie_castMember.castMember_id INNER JOIN movie ON movie.id = movie_castMember.movie_id WHERE movie.external_movie_id = $1",
      [external_movie_id]
    )
    .then((res) => {
      let results = [];
      for (castMember of res.rows) {
        results.push(castMember.name);
      }
      return results;
    })
    .catch((err) => {});
  return movieCast;
};
exports.getDirectors = async function (external_movie_id) {
  const movieDirectors = await pool
    .query(
      "SELECT director.name FROM director INNER JOIN movie_director on director.id = movie_director.director_id INNER JOIN movie ON movie.id = movie_director.movie_id WHERE movie.external_movie_id = $1",
      [external_movie_id]
    )
    .then((res) => {
      let results = [];
      for (directors of res.rows) {
        results.push(directors.name);
      }
      return results;
    })
    .catch((err) => {});
  return movieDirectors;
};
exports.insertMovie = async function (movie) {
  await pool
    .query(
      "INSERT INTO movie (external_movie_id,name,rating,release_date,image_url,storyline,runtime)" +
        "VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id;",
      [
        Number(movie.id),
        movie.name,
        Number(movie.rating),
        movie.release_date,
        movie.image_url,
        movie.description,
        movie.runtime,
      ]
    )
    .then((res) => {
      console.log("insert movie successful");
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getMovieID(movie.id);
      queryResults.wasDuplicate = true;
    });
  console.log(queryResults);
  return queryResults;
};

exports.insertDirector = async function (director) {
  await pool
    .query("INSERT INTO director (name) VALUES ($1) RETURNING id", [director])
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getDirectorID(director);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};

exports.insertCastMember = async function (castMember) {
  await pool
    .query("INSERT INTO castMember (name) VALUES ($1) RETURNING id", [
      castMember,
    ])
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getCastMemberId(castMember);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};

exports.insertMovieDirector = async function (director_id, movie_id) {
  await pool.query(
    "INSERT INTO movie_director ( movie_id,director_id) VALUES ($1,$2)",
    [movie_id, director_id]
  );
};
exports.insertMovieCastMember = async function (castMember_id, movie_id) {
  await pool.query(
    "INSERT INTO movie_castMember ( movie_id,castMember_id) VALUES ($1,$2)",
    [movie_id, castMember_id]
  );
};
exports.insertUserMovie = async function (user_id, movie_id) {
  await pool
    .query("INSERT INTO user_movie (movie_id,user_id) VALUES ($1,$2)", [
      movie_id,
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
exports.deleteMovie = async function (movieID) {
  let wasDeleted = false;

  await pool
    .query("DELETE FROM user_movie WHERE movie_id = $1", [movieID])
    .then((res) => {
      console.log(res.count);
      wasDeleted = true;
    })
    .catch((err) => {
      wasDeleted = false;
    });
  return wasDeleted;
};
