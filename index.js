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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const date = req.params.date || new Date().getTime();
  let validDate;
  let utc;
  let unix;
  try {
    if (!isNaN(new Date(date).getTime())) {
      validDate = new Date(date);
    }
    if (!isNaN(new Date(Number(date)).getTime())) {
      validDate = new Date(Number(date));
    }
    if (!validDate) {
      throw new Error("Parameter is not a number!");
    }
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }

  res.json({ utc: validDate.toUTCString(), unix: validDate.getTime() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
