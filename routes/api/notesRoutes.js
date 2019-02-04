const router = require("express").Router();
const noteController = require("../../controllers/notes");

// methods for /api/notes (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.addNote)
  .delete(noteController.deleteNote);

  //methods for api/notes/:id (PUT)
router
  .route("/:id")
  .put(noteController.updateNote);

  //search method using get api/notes/:title
  router
  .route("/:title")
  .get(noteController.searchNote);

module.exports = router;