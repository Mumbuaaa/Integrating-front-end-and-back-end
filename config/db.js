//Configure database

//import dependencies
const mysql = require('mysql2');
require('dotenv').config()

//Create a pool connection
const pool = mysql.createPool({
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

//Export Pool
module.exports = pool.promise();
