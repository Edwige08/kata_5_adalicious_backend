const express = require('express');
const router = express.Router();
const db = require('../db');

const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

router.get('/', async (req, res) => {
    const dishes = await prisma.dishes.findMany()
    res.json(dishes)
})

router.post('/', async (req, res) => {
    const dishes = await prisma.dishes.create({
        data: {
            dish_name: 'Sushi',
            description: 'Riz poisson',
            image: "🍣"
        },
    })
    res.json(dishes)
    res.sendStatus(200)
})

router.patch('/', async (req, res) => {
    console.log(req.body);
    const {description, dishId} = req.body
    
    const dishes = await prisma.dishes.update({
        where: {
            id: dishId
        },
        data: {
            description: description
        }
    })
    res.sendStatus(200)
})

router.delete('/', async (req, res) => {
    const deleteDish = await prisma.dishes.delete( {
        where : {
            id: 15
        }
    })
})

module.exports = router;