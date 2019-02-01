const router = require("express").Router();
const noteController = require("../../Controllers/notes");

// methods for /api/tables (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.addNote)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote)
  .search(noteController.searchNote);

module.exports = router;