const dbconfig = require("../../database/db.js");
const pool = dbconfig.pool;

let queryResults = { id: null, wasDuplicate: false };

getAuthorID = async function (author) {
  const id = await pool
    .query("SELECT id FROM author WHERE name = $1", [author])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
};
exports.getUserBooks = async function (user_id) {
  const user_books = await pool
    .query(
      "SELECT external_book_id AS id, name, release_date, image_url, storyline AS description, rating, page_count AS numPages, edition_count AS numEditions FROM book INNER JOIN user_book on book.id = user_book.book_id INNER JOIN nerd_cashe_user ON nerd_cashe_user.id = user_book.user_id WHERE nerd_cashe_user.id = $1",
      [user_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
  return user_books;
};
exports.getBookAuthors = async function (external_book_id) {
  const book_authors = await pool
    .query(
      "SELECT name FROM author INNER JOIN book_author on author.id = book_author.author_id WHERE book_author.book_id = $1",
      [external_book_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
  return book_authors;
};
exports.insertBook = async function (book) {
  await pool
    .query(
      "INSERT INTO book (external_game_id,name,rating,release_date,image_url,storyline,page_count,edition_count )" +
        "VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;",
      [
        Number(book.id),
        book.name,
        Number(book.rating),
        Number(book.release_date),
        book.image_url,
        book.description,
        book.page_count,
        book.edition_count,
      ]
    )
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getBookID(book.id);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};
exports.insertAuthor = async function (author) {
  await pool
    .query("INSERT INTO author (name) VALUES ($1) RETURNING id", [author])
    .then((res) => {
      queryResults.id = res.rows[0].id;
      queryResults.wasDuplicate = false;
    })
    .catch(async (err) => {
      queryResults.id = await getAuthorID(publisher);
      queryResults.wasDuplicate = true;
    });
  return queryResults;
};
exports.insertBookAuthor = async function (book_id, author_id) {
  await pool.query(
    "INSERT INTO book_author (book_id, author_id) VALUES ($1,$2)",
    [book_id, author_id]
  );
};
exports.insertBookPublisher = async function (book_id, publisher_id) {
  await pool.query(
    "INSERT INTO book_bookPublisher (book_id,publisher_id) VALUES ($1,$2)",
    [book_id, publisher_id]
  );
};
exports.insertUserBook = async function (book_id, user_id) {
  await pool
    .query("INSERT INTO user_book (book_id,user_id) VALUES ($1,$2)", [
      book_id,
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
exports.deleteBook = async function (book_id) {
  let wasDeleted = false;
  console.log(gameID);
  await pool
    .query("DELETE FROM user_book WHERE book_id = $1", [book_id])
    .then((res) => {
      console.log(res.count);
      wasDeleted = true;
    })
    .catch((err) => {
      wasDeleted = false;
    });
  return wasDeleted;
};
const getBookID = (module.exports = async function (external_book_id) {
  const id = await pool
    .query("SELECT id FROM book WHERE book.external_book_id = $1", [
      external_book_id,
    ])
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {});
  return id;
});
