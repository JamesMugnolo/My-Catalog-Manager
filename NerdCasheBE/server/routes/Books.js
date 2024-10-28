const express = require("express");
let router = express.Router();
let cors = require("cors");
require("dotenv").config();
const axios = require("axios");

//const { getUserID } = require("../../database/Users/user_db_commands.js");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/external/:title", async function (req, res) {
  let ItemIds = [];
  let formattedItems = [];
  console.log("in book ext get");
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
        console.log(description);
        return description;
      });
      if (storyline != "") {
        let formattedBook = {
          id: book.id,
          name:
            book.title +
            (book.subtitle != undefined ? ` ${book.subtitle}` : ""),
          rating: Math.round(book.ratings_average * 20),
          release_date: getFirstReleaseDate(
            book.publish_date,
            book.first_publish_year
          ),
          image_url: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          storyline: storyline,
          authors: book.author_name,
          numEditions: book.edition_count,
          numPages: book.number_of_pages_median,
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
    //console.log(dateStrings);
    for (date of dateStrings) {
      formattedDates.push(new Date(date));
    }
    //console.log("converted all dates");
  }
  formattedDates = formattedDates.sort((d1, d2) => d1 - d2);
  console.log(formattedDates[0]);
  return formattedDates[0];
}
module.exports = router;
