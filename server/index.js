const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");

app.listen(9000, () => {
  console.log("Server Works !!! At port 9000");
});

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": ["GET", "POST", "OPTIONS"],
  "Access-Control-Allow-Headers": ["Origin", "Content-Type", "Accept"],
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const twitchOptions = {
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": "uywdn3u5k0i0p27xlasmsp7vxk1o2t",
  },
  method: "GET",
}

app.get("/download/twitchclip", async (req, res) => {
  var URL = req.query.URL;
  var temp = URL.split("/");
  var clipName = temp[temp.length - 1];
  var downloadURL = "";
  var statusCode = 200;

  await new Promise((resolve) => {

    var req = https.get("https://api.twitch.tv/kraken/clips/" + clipName, twitchOptions, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {

        if (res.statusCode === 200) {
          try {
            body = JSON.parse(body);
            downloadURL = body.thumbnails.small.split("-preview-")[0] + ".mp4";
            resolve(downloadURL);
          } catch (error) {
            printError(error);
          }
        } else {
          statusCode = res.statusCode;
          resolve(downloadURL);
        }
      });
    });
    req.end();
  });

  res.set(headers);
  res.json({ url: downloadURL, statusCode: statusCode });
});

app.get("/download/ytvideo", async (req, res) => { });
