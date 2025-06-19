const express = require('express');
const cors = require("cors");
require('dotenv').config()
const app = express();

const dishesRoutes = require('./routes/dishes')
const usersRoutes = require('./routes/users')
const usersOrders = require('./routes/orders')

const port = 3010;

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/dishes', dishesRoutes)
app.use('/users', usersRoutes)
app.use('/orders', usersOrders)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})