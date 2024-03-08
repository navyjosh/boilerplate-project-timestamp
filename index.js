// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:timestring", (req, res) => {
  if (isNaN(req.params.timestring)) {
    if (!isNaN(Date.parse(req.params.timestring))) {
      timestamp = new Date(req.params.timestring);
      timestamp.setUTCHours(0, 0, 0, 0);
    } else {
      res.json({
        error: "Invalid Date",
      });
    }
  } else {
    timestamp = new Date(Number(req.params.timestring));
  }

  res.json({
    unix: timestamp.getTime(),
    utc: timestamp.toUTCString(),
    type: typeof timestamp,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
