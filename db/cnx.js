var mysql = require("mysql");
require("dotenv");

var cnx;

// Sets up db to connect locally or on JAWSDB if deployed
if (process.env.JAWSDB_URL) {
  cnx = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  cnx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Watinoma00",
    database: "notes_db"
  });
}

// Turns BOOLEAN 0s and 1s returned from the db into true and false
cnx.config.typeCast = function(field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; // 1 = true, 0 = false
  }
  return next();
};

// Export the connection so it's available in other parts of the app
module.exports = cnx;