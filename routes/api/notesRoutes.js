const router = require("express").Router();
const noteController = require("../../controllers/notes");

// methods for /api/notes (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.addNote)
  .delete(noteController.deleteNote)
  .search(noteController.searchNote);

  //methods for api/notes/:id (PUT)
router
  .route("/:id")
  .put(noteController.updateNote);

module.exports = router;