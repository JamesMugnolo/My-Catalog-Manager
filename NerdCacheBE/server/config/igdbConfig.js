const igdb = require("igdb-api-node").default;
require("dotenv").config();
const fetch = require("node-fetch");

async function ConfigureClient() {
  const accessToken = await GetAccessToken();
  return igdb(process.env.TWITCH_CLIENT_ID, accessToken);
}

function GetAccessToken() {
  url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  return fetch(url, { method: "POST" })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.access_token;
    })
    .catch((err) => {
      throw new Error(`unable to get auth token from Twitch: ${err}`);
    });
}

module.exports = ConfigureClient;
