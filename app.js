const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config()

const dishesRoutes = require('./routes/dishes')
const usersRoutes = require('./routes/users')

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3010;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/dishes', dishesRoutes)
app.use('/users', usersRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

require('dotenv').config();

const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result.rows[0]);
    } finally {
        client.release();
    }
}

getPgVersion();