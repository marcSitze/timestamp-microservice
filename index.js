// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


// your first API endpoint... 
app.get("/api/", function (_req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date
  console.log("DATE: ", typeof date)
  if (date === "") {
    console.log("falls here...")
      return res.json({
          unix: new Date().getTime(),
          utc: new Date(Date.now).toUTCString()
      })
  }

  const dateNumber = Number(date)
  if (/\d{5,}/.test(date)) {
      res.json({
          unix: Number(date), utc: new Date(dateNumber).toUTCString()
      })
  } else {
    console.log("FALLS HERE...")
    if (date === "" || date == "undefined") {
      console.log("falls here...")
        return res.json({
          unix: new Date().getTime(),
          utc: new Date(Date.now).toUTCString()
        })
    }
      const dateObj = new Date(date);
      if (dateObj.toString() === "Invalid Date") {
          res.json({ error : "Invalid Date" })
      } else {
          res.json({ unix: Number(dateObj.valueOf()), utc:dateObj.toUTCString() })
      }
  }

})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});