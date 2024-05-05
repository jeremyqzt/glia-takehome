const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./glia.db";

const createTable = (db) => {
  db.exec(`
    CREATE TABLE prices
    (
      Id INTEGER      PRIMARY KEY,
      description     VARCHAR(50) NOT NULL,
      lowerBound      INTEGER NOT NULL,
      upperBound      INTEGER NOT NULL
    );
    INSERT INTO prices(ID, description, lowerBound, upperBound) VALUES
    (1, 'Free', 0, 0),
    (2, 'Low', 0.01, 0.5),
    (3, 'High', 0.51, 1);

    CREATE TABLE accessibility
    (
      ID INTEGER      PRIMARY KEY,
      description     VARCHAR(50) NOT NULL,
      lowerBound      INTEGER NOT NULL,
      upperBound      INTEGER NOT NULL
    );
    INSERT INTO accessibility(ID, description, lowerBound, upperBound) VALUES
    (1, 'High', 0, 0.25),
    (2, 'Medium', 0.26, 0.75),
    (3, 'Low', 0.76, 1);

    CREATE TABLE users
    (
      userId          TEXT PRIMARY KEY,
      userName        VARCHAR(50) NOT NULL,
      priceId         INTEGER NOT NULL,
      accessibilityId INTEGER NOT NULL,
      CONSTRAINT priceId_FK FOREIGN KEY (priceId) REFERENCES prices (Id)
      CONSTRAINT accessibilityId_FK FOREIGN KEY (accessibilityId) REFERENCES accessibility (Id)
    );
  `);
}

const createDbConnection = () => {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    return db;
  }
};

const query = async (sql) => {
  return new Promise((resolve, _) => {
    const connection = createDbConnection();
    connection.exec(sql, () => {
      resolve();
    });
  });
};

const queryData = async (sql) => {
  return new Promise((resolve, _) => {
    const connection = createDbConnection();
    connection.all(sql, [], (_, rows) => {
      resolve(rows);
    });
  });
};

module.exports = {
  query,
  queryData,
};
