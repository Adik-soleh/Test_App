// db.js
const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestApp',
    password: '87654321',
    port: 5432,
});

module.exports = pool;
