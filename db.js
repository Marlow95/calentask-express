const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'jD37ghBR69k!',
    host: 'localhost',
    port: 5432,
    database: 'calentask'
})

module.exports = pool
