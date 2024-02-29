var mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_framework",
});

connection.connect((error) => {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connection Success");
  }
});

module.exports = connection;
