const mysql = require("mysql");

// const db = mysql.createConnection({
//     host : "localhost",
//     database : "nodejs-g2",
//     user : "root",
//     password : ""
// })

const db = mysql.createConnection({
    host : "bn3d9eb0e4zyxtwbpqqg-mysql.services.clever-cloud.com",
    database : "bn3d9eb0e4zyxtwbpqqg",
    user : "uqidhymqrp0kfpe4",
    password : "s9C1GO313q0vZl72SKm6"
})

db.connect();

module.exports = db;
