// db.js
const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',       // or your MySQL host
  user: 'root',            // your MySQL username
  password: 'harleenkaurkukreja@1201',            // your MySQL password
  database: 'bootcamp', // change to your database name
  connectionLimit: 10      // optional: max number of connections
});

// Export a promise-based version of the pool
module.exports = pool.promise();
