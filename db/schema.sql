DROP DATABASE IF EXISTS notes_db;
CREATE DATABASE notes_db;
USE notes_db;
CREATE TABLE notes (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  content VARCHAR(255) NULL,
  date_creation DATETIME NOT NULL,
  last_modification DATETIME NOT NULL,
  PRIMARY KEY (`id`));