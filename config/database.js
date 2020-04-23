const {createPool} = require('mysql');
const pool = createPool({
    port: 8889,
    host: "localhost",
    user: "root",
    password: "root",
    database: "back",
    connectionLimit: 10,
})

module.exports = pool;
