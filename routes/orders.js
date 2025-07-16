const express = require('express');
const router = express.Router();
const db = require('../db');

const { PrismaClient } = require('../generated/prisma');
const { connect } = require('./dishes');
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

router.get('/', async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            select: {
                id: true,
                order_status: true,
                created_at: true,
                users: {
                    select: {
                        username: true
                    }
                },
                dishes: {
                    select: {
                        dish_name: true,
                        image: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        console.log(orders);
        
        res.status(200).json(orders)
    }
    catch {
        res.status(500).json({error : 'Erreur lors de la récupération des commandes'})
    }
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

router.patch('/', async (req, res) => {
    const {orderId, order_status} = req.body
    
    const updateOrder = await prisma.orders.update({
        where: {
            id: orderId
        },
        data: {
            order_status: order_status
        }
    })
    res.json(updateOrder)
    // res.sendStatus(200)
})

router.delete('/', async (req, res) => {
    const {orderId} = req.body;
    const deleteDish = await prisma.orders.delete({
        where: {
            id: orderId
        }
    })
    // res.json(deleteDish)
    res.sendStatus(200)
})

module.exports = router;