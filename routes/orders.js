const express = require('express');
const router = express.Router();
const db = require('../db');

const { PrismaClient } = require('../generated/prisma');
const { connect } = require('./dishes');
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

router.get('/', async (req, res) => {
    const orders = await prisma.orders.findMany()
    res.json(orders)
})

router.post('/', async (req, res) => {
    const {userId, dishId} = req.body;
    console.log(dishId);
    
    const orders = await prisma.orders.create({
        data: {
            user_id: userId,
            dish_id: dishId,
            order_status: 'sent',
        },
    })
    
    res.json(orders)
    // res.sendStatus(200)
})

router.delete('/', async (req, res) => {
    const {orderId} = req.body;
    console.log("🍓 ", req.body.id)
    const deleteDish = await prisma.orders.delete({
        where: {
            id: orderId
        }
    })
    // res.json(deleteDish)
    res.sendStatus(200)
})

module.exports = router;