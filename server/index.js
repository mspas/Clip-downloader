const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
const ytdl = require('ytdl-core');

app.listen(9000, () => {
  console.log("Server Works !!! At port 9000");
});

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": ["GET", "POST", "OPTIONS"],
  "Access-Control-Allow-Headers": ["Origin", "Content-Type", "Accept"],
};

const twitchOptions = {
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": "uywdn3u5k0i0p27xlasmsp7vxk1o2t",
  },
  method: "GET",
}

const YT_API_KEY = "AIzaSyC6po_hBpCzAlmDcGBG8lqKBo0SM-B9cyw";

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


app.get("/get-video-info", async (req, res) => {
  const URL = req.query.URL;
  const videoId = URL.split("?")[1].match(/v=([^&]+)/)[1];
  let foundFlag = false;

  await new Promise((resolve) => {
    var req = https.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=" + YT_API_KEY, response => {
      response.setEncoding("utf8");
      let body = "";
      response.on("data", data => {
        body += data;
      });
      response.on("end", () => {
        if (res.statusCode === 200) {
          try {
            body = JSON.parse(body);
            foundFlag = body.items.length > 0 ? true : false;
            resolve(foundFlag);
          } catch (error) {
            printError(error);
          }
        } else {
          resolve(foundFlag);
        }
      });
    });
    req.end();
  });

  res.set(headers);
  res.json({ foundFlag: foundFlag });
});

app.get("/download/ytvideo", async (req, res) => {
  const URL = req.query.URL;
  const videoId = URL.split("?")[1].match(/v=([^&]+)/)[1];

  res.header('Content-Disposition', 'attachment; filename=" video' + videoId + '.mp4"');
  ytdl(URL, {
    format: 'mp4'
  }).pipe(res);
});