const express = require('express');
const router = express.Router();
const {Order} = require('../schemas/userSchema');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ 'orderDate': -1 });
        
        const currentOrders = orders.filter((order)=> order.orderStatus !=='Completed' && order.orderStatus !=='Cancelled')
        res.status(200).json(currentOrders);
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Message": "Internal Server Error" });
    }
});
module.exports = router