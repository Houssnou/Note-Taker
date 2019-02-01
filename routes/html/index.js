const router = require("express").Router();
const noteHTMLRoutes = require("./htmlRoutes");

router.use("/", noteHTMLRoutes);

module.exports = router;