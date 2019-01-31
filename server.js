const express = require("express");
const path = require("path");
const cnx = require("./db/cnx");
const moment=require("moment");


const app = express();
const PORT = process.env.PORT || 3000;

//express stuff
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//get api 
app.get("/api/notes", (req, res)=> {
  cnx.query("SELECT * FROM notes", (err, dbNotes)=> {
    res.json(dbNotes);
  });
});

//post api
app.post("/api/notes", (req, res)=> {
  cnx.query("INSERT INTO notes SET ?",req.body, (err, result)=> {
    if (err) {
      console.log("Insert Error: "+err);
      res.status(400).json(err);
    };  
    res.json(result);
  });
});


//caution this fires up the "server"
app.listen(PORT, function () {
  console.log("Server listenning on port: " + PORT);
});