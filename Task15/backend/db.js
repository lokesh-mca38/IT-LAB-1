const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TIsh@2003",
    database: "crudDB"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

module.exports = db;