// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date

  if (!dateInput) {
    let date = new Date()
    return res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }

  let date
  // Check if the date is provided as Unix timestamp
  if (!isNaN(dateInput)) {
    date = new Date(parseInt(dateInput))
  } else {
    // Create a new Date object from the input
    date = new Date(dateInput)
  }

   if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" })
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})


// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})