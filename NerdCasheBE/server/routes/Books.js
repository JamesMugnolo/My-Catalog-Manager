const express = require("express");
let router = express.Router();
const axios = require("axios");
const {
  getBookID: getBookID,
  getUserBooks: getUserBooks,
  getBookAuthors,
  insertBook,
  insertAuthor,
  insertBookAuthor,
  insertUserBook,
  deleteBook,
} = require("../../database/Books/book_commands.js");
const { getUserID } = require("../../database/Users/user_db_commands.js");

router.get("/external/:title", async function (req, res) {
  let ItemIds = [];
  let formattedItems = [];

  //grabs all the movie Ids from TMDB
  let result = await axios
    .request(
      `https://openlibrary.org/search.json?q=${req.params.title}&limit=50`
    )
    .then((response) => {
      return response.data.docs;
    });
  for (book of result) {
    // multiplying rating score by 20 changes rating from /5 t0 /100
    if (book.ratings_average != null) {
      const worksURL = `https://openlibrary.org${book.key}.json`;
      let storyline = await axios.request(worksURL).then((response) => {
        let description = "";
        let descLines = [];
        if (response.data.description != undefined) {
          if (response.data.description instanceof Object) {
            descLines = response.data.description.value.split("\r\n\r\n");
          } else {
            descLines = response.data.description.split("\r\n\r\n");
          }

          description = descLines
            .filter((line) => {
              if (
                line.startsWith("-") ||
                line.startsWith("\r") ||
                line.startsWith(" ") ||
                line.startsWith("Contains:")
              ) {
                return false;
              }
              return true;
            })
            .join();
        }

        return description;
      });
      if (storyline != "") {
        let formattedBook = {
          id: book.cover_i,
          name:
            book.title +
            (book.subtitle != undefined ? ` ${book.subtitle}` : ""),
          rating: Math.round(book.ratings_average * 20),
          release_date: getFirstReleaseDate(
            book.publish_date,
            book.first_publish_year
          ),
          image_url: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          description: storyline,
          authors: book.author_name,
          num_editions: book.edition_count,
          num_pages: book.number_of_pages_median,
        };
        formattedItems.push(formattedBook);
      }
    }
  }
  res.json(formattedItems);
});
function getFirstReleaseDate(published_dates, first_published_year) {
  let formattedDates = [];
  if (published_dates != undefined) {
    const dateStrings = published_dates.filter((date) =>
      date.includes(first_published_year)
    );

    for (date of dateStrings) {
      formattedDates.push(new Date(date));
    }
  }
  formattedDates = formattedDates.sort((d1, d2) => d1 - d2);

  return formattedDates[0];
}
router.delete("/internal/", async function (req, res) {
  let queryResults;
  let deletedUserBookIds = [];

  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  for (book of req.body.items) {
    const bookID = await getBookID(book.id);
    const wasRemoved = await deleteBook(bookID);
    if (wasRemoved) {
      deletedUserBookIds.push(book.id);
    }
  }

  res.json({
    deletedUserItemIds: deletedUserBookIds,
  });
});

router.get("/internal", async function (req, res) {
  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }

  const userID = result.rows[0].id;

  let books = await getUserBooks(userID);

  for (let index = 0; index < books.length; index++) {
    books[index].authors = await getBookAuthors(books[index].id);
  }
  res.json({
    userItems: books,
  });
});
router.post("/internal", async function (req, res) {
  let queryResults;
  let insertedUserBookIds = [];

  const result = await getUserID(req.username);

  if (result.rowCount == 0) {
    return res.status(403);
  }
  const userID = result.rows[0].id;
  for (book of req.body.items) {
    queryResults = await insertBook(book);
    const bookID = queryResults.id;

    if (queryResults.wasDuplicate === false) {
      await insertAuthorList(book.authors, bookID, queryResults);
    }
    queryResults = await insertUserBook(bookID, userID);
    if (queryResults.wasDuplicate === false) {
      insertedUserBookIds.push(book.id);
    }
  }
  res.json({
    insertedUserItemIds: insertedUserBookIds,
  });
});
async function insertAuthorList(authors, bookID, queryResults) {
  for (const author of authors) {
    queryResults = await insertAuthor(author);
    await insertBookAuthor(queryResults.id, bookID);
  }
}
module.exports = router;
