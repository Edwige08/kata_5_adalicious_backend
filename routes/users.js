const express = require('express');
const router = express.Router();
const db = require('../db');

const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

router.get('/', async (req, res) => {
    const users = await prisma.users.findMany()
    res.json(users)
})

router.post('/', async (req, res) => {
    const {username} = req.body; // version déconstruite
    // équivaut à : const whisky = req.body.username
    const users = await prisma.users.create({
        data: {
            username: username,
        },
        // select:{id: true}
    })
    console.log("id de l'user enregistré : " + users.id)
    res.json(users.id)
    // res.sendStatus(200)
})

module.exports = router;
