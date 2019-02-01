const express = require("express");
const path = require("path");
const cnx = require("./db/cnx");
const moment = require("moment");


const app = express();
const PORT = process.env.PORT || 3000;

//express stuff
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//get api/notes
app.get("/api/notes", (req, res) => {
  cnx.query("SELECT * FROM notes", (err, dbNotes) => {
    res.json(dbNotes);
  });
});

//post api/notes
app.post("/api/notes", (req, res) => {
  cnx.query("INSERT INTO notes SET ?", req.body, (err, result) => {
    if (err) {
      console.log("Insert Error: " + err);
      res.status(400).json(err);
    };
    res.json(result);
  });
});

//delete api/delete
app.post("/api/delete", (req, res) => {
  cnx.query("delete from notes where id = ?", req.body.id, (err, result) => {
    if (err) {
      console.log("Delete Error: " + err);
      res.status(400).json(err);
    };
    res.json(result);
  });
});

//update api/update
app.put("/api/update", (req, res) => { 
  //build the const to update data
  const paramData = {
    title: req.body.title,
    content: req.body.content,
    last_modification: req.body.last_modification
  };
  //build the const where to update
  const paramWhere = {
    id: req.body.id
  };

  //Update products set ? where ?
  cnx.query("update notes set ? where ?", [paramData, paramWhere], (err, result) => {
    if (err) {
      console.log("Update Error: " + err);
      res.status(400).json(err);
    };
    res.json(result);
  });
});

//search api
app.get("/api/notes/:note", function (req, res) {
  connection.query("SELECT * FROM notes WHERE title = ? LIMIT 1", [req.params.title], function (err, dbCharacter) {
    if (err) throw err;

    if (dbCharacter[0]) {
      res.json(dbCharacter[0]);
    } else {
      res.json(null);
    }
  });
});


//caution this fires up the "server"
app.listen(PORT, function () {
  console.log("Server listenning on port: " + PORT);
});