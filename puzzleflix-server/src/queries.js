const mysql = require("mysql");

// Real pool — `mysql.createConnection` silently ignored `connectionLimit`,
// and on a fatal error every consumer kept a reference to the dead connection
// (the reconnect function built a new one but couldn't update the module export),
// so every subsequent query failed with "Cannot enqueue Query after fatal error".
// A pool transparently re-dials, so no manual reconnect dance is needed.
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
});

pool.on("error", (err) => {
    console.error("MySQL pool error:", err.code || err.message);
});

module.exports = pool;
