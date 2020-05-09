const express = require("express");
const cors = require("cors");
const app = express();
const request = require("request");

app.listen(9000, () => {
  console.log("Server Works !!! At port 9000");
});

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": ["GET", "POST", "OPTIONS"],
  "Access-Control-Allow-Headers": ["Origin", "Content-Type", "Accept"],
};

app.get("/download/twitchclip", async (req, res) => {
  var URL = req.query.URL;
  var temp = URL.split("/");
  var clipName = temp[temp.length - 1];
  var downloadURL = "";

  await new Promise((resolve) => {
    request(
      {
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json",
          "Client-ID": "uywdn3u5k0i0p27xlasmsp7vxk1o2t",
        },
        uri: "https://api.twitch.tv/kraken/clips/" + clipName,
        method: "GET",
      },
      function (err, res, body) {
        let data = JSON.parse(body);
        downloadURL = data.thumbnails.small.split("-preview-")[0] + ".mp4";
        resolve(downloadURL);
      }
    );
  });
  res.set(headers);
  res.json({ url: downloadURL });
});

app.get("/download/ytvideo", async (req, res) => { });
