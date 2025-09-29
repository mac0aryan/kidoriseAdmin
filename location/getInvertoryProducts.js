const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Products = require('../schemas/productSchema');

router.post('/', async (req, res) => {
    const { locationName } = req.body
    try {
        const products = await Products.find({
            'inventory.locationName': locationName
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
});
module.exports = router;
