const router = require("express").Router();
// import any api routes
const noteRoutes = require("./notesRoutes");

// prefix api routes with their specific endpoint name
router.use("/notes", noteRoutes);

module.exports = router;

