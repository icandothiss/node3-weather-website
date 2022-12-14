const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sir Behemoth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sir Behemoth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help",
    title: "Help",
    name: "Sir Behemoth",
  });
});

app.get("/weather", (req, res) => {
  let provided = req.query.address;
  if (!provided) {
    return res.send({
      error: " WE need an adress!!",
    });
  }
  geocode(provided, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longtitude, (error, forcaseData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: forcaseData,
        location: location,
        address: provided,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sir Behemoth",
    errorMessage: "Help not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sir Behemoth",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
