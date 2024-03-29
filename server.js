const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const https = require("https");
const ytdl = require("ytdl-core");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const twitchOptions = {
  headers: {
    Accept: "application/vnd.twitchtv.v5+json",
    "Client-ID": process.env.TWITCH_CLIENT_ID,
  },
  method: "GET",
};

const YT_API_KEY = process.env.YT_API_KEY;

app.get("/api/download/twitchclip", async (req, res) => {
  var clipName = req.query.videoId;
  var downloadURL = "";
  var statusCode = 200;

  await new Promise((resolve) => {
    var req = https.get(
      "https://api.twitch.tv/kraken/clips/" + clipName,
      twitchOptions,
      (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              body = JSON.parse(body);
              downloadURL =
                body.thumbnails.small.split("-preview-")[0] + ".mp4";
              resolve(downloadURL);
            } catch (error) {
              console.log(error);
            }
          } else {
            statusCode = res.statusCode;
            resolve(downloadURL);
          }
        });
      }
    );
    req.end();
  });

  res.json({ url: downloadURL, statusCode: statusCode });
});

app.get("/api/get-video-info", async (req, res) => {
  const videoId = req.query.videoId;
  let foundFlag = false;

  await new Promise((resolve) => {
    var req = https.get(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
      videoId +
      "&key=" +
      YT_API_KEY,
      (response) => {
        response.setEncoding("utf8");
        let body = "";
        response.on("data", (data) => {
          body += data;
        });
        response.on("end", () => {
          if (res.statusCode === 200) {
            try {
              body = JSON.parse(body);
              foundFlag = body.items.length > 0 ? true : false;
              resolve(foundFlag);
            } catch (error) {
              console.log(error);
            }
          } else {
            resolve(foundFlag);
          }
        });
      }
    );
    req.end();
  });

  res.json({ foundFlag: foundFlag });
});

app.get("/api/download/ytvideo", async (req, res) => {
  const URL = req.query.URL;
  const videoId = req.query.videoId;
  const format = req.query.format;

  res.header(
    "Content-Disposition",
    'attachment; filename=" video' + videoId + "." + format + '"'
  );
  ytdl(URL, {
    format: format,
  }).pipe(res);
});

app.get("/api/download/ytvideo2", async (req, res, next) => {
  const URL = req.query.URL;
  const videoId = req.query.videoId;
  const format = req.query.format;

  res.header(
    "Content-Disposition",
    'attachment; filename=" video' + videoId + "." + format + '"'
  );
  ytdl(URL, {
    format: format,
  }).pipe(res);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
