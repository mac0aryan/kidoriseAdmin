const express = require('express');
const router = express.Router();
const {Order} = require('../schemas/userSchema');

router.post('/', async (req, res) => {
    const { pageNo = 1, sortTypeToFetch = 'All', ordersPerPage = 25 } = req.body;
    const skip = (pageNo - 1) * ordersPerPage;

    try {
        let query = {};

        if (['Placed', 'Processing', 'Dispatched', 'Out for Delivery', 'Delivered','Cancelled'].includes(sortTypeToFetch)) {
            query = { "orderStatus": sortTypeToFetch };
        } else if (['Paid', 'Unpaid'].includes(sortTypeToFetch)) {
            query = { "paymentStatus": sortTypeToFetch };
        } else if(sortTypeToFetch === 'All'){
            query = {}
        }

        const orders = await Order.find(query)
            .sort({ 'orderDate': -1 })
            .skip(skip)
            .limit(ordersPerPage);
        const totalOrders = await Order.countDocuments(query);
        
        res.status(200).json({ orders, totalOrders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
