// import dependencies
const express = require("express");

// import routes
const routes = require("./routes");

// create new express server
const app = express();

// set up port
const PORT = process.env.PORT || 3000;

//express stuff
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// caution this fires up the routes
app.use(routes);


//caution this fires up the "server"
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});