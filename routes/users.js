const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM users')
    res.status(200).send(result.rows)
})

router.post ('/', (req, res) => {
    
})

module.exports = router;
