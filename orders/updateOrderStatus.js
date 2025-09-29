const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Order, User } = require('../schemas/userSchema');

router.post('/', async (req, res) => {
    const { orderID, status, email } = req.body;

    if (!orderID || !status || !email) {
        return res.status(400).json({ message: 'orderID, status, and email are required' });
    }

    try {
        const order = await Order.findOne({ orderID });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the main order object
        order.orderStatus = status;
        await order.save();

        if (status !== 'Delivered' && status !== 'Cancelled') {
            // Just update the status in currentOrders
            await User.findOneAndUpdate(
                { email },
                {
                    $set: {
                        "currentOrders.$[elem].orderStatus": status,
                    }
                },
                {
                    arrayFilters: [{ "elem.orderID": orderID }]
                }
            );
        } else {
            // Move to orderHistory
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const orderIndex = user.currentOrders.findIndex(order => order.orderID === orderID);

            if (orderIndex === -1) {
                return res.status(404).json({ message: 'Order not found in currentOrders' });
            }

            // Prepare the order for history
            const orderToMove = user.currentOrders[orderIndex];
            orderToMove.orderStatus = status;
            if (status === 'Cancelled') {
                orderToMove.paymentStatus = 'Failed';
            }

            // Remove from currentOrders & push to orderHistory
            user.currentOrders.splice(orderIndex, 1);
            user.orderHistory.push(orderToMove);

            await user.save();
        }

        res.status(200).json({ message: 'Order status updated successfully' });

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
