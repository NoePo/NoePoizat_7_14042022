const mysql = require('mysql2');
require('dotenv').config({path: require('find-config')('.env')});

// Connexion à la base de donnée
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connexion réussie !');
});

module.exports.getDB = () => {
    return db;
}