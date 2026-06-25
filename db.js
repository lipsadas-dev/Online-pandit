const mysql = require("mysql2");

const db = mysql.createConnection({
    host : mysql.railway.internal,
    user: root,
    password: syTcQQeQFFhhMhFvKrlnYJpBSGXfHoCd,
    database: railway
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed", err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;