// require("dotenv").config();
// const express = require("express");
// const https = require("https");
// const ejs = require("ejs");
// const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");


// app.get("/", function(req, res) {
//   res.render("index", { weatherData: undefined });
// });

// app.post("/", function(req, res) {
//   const cityName = req.body.cityName;
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.apiKey}&units=$metric`;

//   https.get(url, function(response) {
//     response.on("data", function(data) {
//       const weatherData = JSON.parse(data);
//       res.render("index", { weatherData: weatherData });
//     });
//   });
// });

// app.listen(3000, function() {
//   console.log("Server is running on port 3000");
// });


require("dotenv").config();
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", { weatherData: undefined, error: undefined });
});

app.post("/", function(req, res) {
  const cityName = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.apiKey}&units=metric`;

  https.get(url, function(response) {
    if (response.statusCode !== 200) {
      res.render("index", { weatherData: undefined, error: "Error: City not found" });
      return;
    }

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      res.render("index", { weatherData: weatherData, error: undefined });
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
