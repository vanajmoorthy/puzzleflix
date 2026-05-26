const mysql = require("mysql");

const pool = mysql.createConnection({
    connectionLimit: 10,
    user: "cs3099user15",
    host: "68.183.38.239",
    database: "cs3099user15_PuzzleFlix",
    password: "y!pqA34S8sgEJy",
    port: 3306,
    waitForConnections: true,
    timeout: 60000
});

// Any fatal error on the connection used to `throw`, which crashed the
// process. Log instead, and reconnect when the error is fatal/connection-level.
function handleDisconnect(conn) {
    conn.on('error', function (error) {
        console.error('Database connection error:', error.code || error.message);
        if (error.fatal || error.code === 'PROTOCOL_CONNECTION_LOST' || error.code === 'ECONNRESET') {
            reconnect(conn);
        }
    });
}

function reconnect(conn) {
    console.error('Reconnecting to database...');
    const fresh = mysql.createConnection(conn.config);
    handleDisconnect(fresh);
    fresh.connect(function (error) {
        if (error) {
            console.error('Error when reconnecting:', error.code || error.message);
            setTimeout(reconnect, 2000, fresh);
        } else {
            console.error('Reconnected to the database.');
        }
    });
}

handleDisconnect(pool);

pool.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error.code || error.message);
    }
});

module.exports = pool;
