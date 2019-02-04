const cnx = require("../db/cnx");

module.exports = {
  //select all query
  getAllNotes: (req, res) => {
    cnx.query("SELECT * FROM notes", (err, dbNotes) => {

      res.json(dbNotes);
    });
  },

  //add a note
  addNote: (req, res) => {
    cnx.query("INSERT INTO notes SET ?", req.body, (err, result) => {
      if (err) {
        console.log("Insert Error: " + err);
        res.status(400).json(err);
      };
      res.json(result);
    });
  },

  //update a note /:id
  updateNote: (req, res) => {
    //build the const to update data
    const paramData = {
      title: req.body.title,
      content: req.body.content,
      last_modification: req.body.last_modification
    };
    //build the const where to update
    const paramWhere = {
      id: req.params.id
    };

    //Update products set ? where ?
    cnx.query("update notes set ? where ?", [paramData, paramWhere], (err, result) => {
      if (err) {
        console.log("Update Error: " + err);
        res.status(400).json(err);
      };
      res.json(result);
    });
  },

  //delete a note
  deleteNote: (req, res) => {
    cnx.query("delete from notes where id = ?", req.body.id, (err, result) => {
      if (err) {
        console.log("Delete Error: " + err);
        res.status(400).json(err);
      };
      res.json(result);

    });
  },

  //seachNote
  searchNote: (req, res) => { //req.body.title
    //building the search parameter
    const search=`%${req.params.title}%`;
    console.log(search);

    cnx.query("SELECT * FROM notes WHERE title LIKE ?", [search], function (err, dbNotesFound) {
      if (err) throw err;

      if (dbNotesFound) {
        res.json(dbNotesFound);
      } else {
        res.json(null);
      }
    });
  }
}