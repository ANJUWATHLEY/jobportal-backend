const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  // ✅ This was missing earlier!
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// MySQL Connect
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ MySQL Connected Successfully!');
});

// Optional safety check
db.on('error', function (err) {
  console.error('❗ MySQL error:', err);
});

module.exports = db;
