//1.Dependencies
const express = require("express");
const path = require("path");

// import routes
const indexRoutes = require("./routes/indexRoutes")

// 2.Instantiations
const app = express();
const PORT = 3001;

// 3.Configurations
//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views' directory

// 4.Middleware
//time logger for all routes
app.use((req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});
//Simple request time logger for a specific route
app.use("/home", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});
// To parse URL encoded data
app.use(express.urlencoded({ extended: false })); //this helps to parse data from forms
app.use(express.static(path.join(__dirname, "public"))); //this helps to serve static files like css, js, images from the public folder

// 5.Routes
// using imported routes
app.use("/", indexRoutes)
//non exsitant routes regardless of the method used(get, post, put, delete) will be caught by this middleware
// This will always the last endpoint in this file
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

// 6.Bootstrapping Server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
