const express = require('express');
const router = express.Router();
const Product = require('../schemas/productSchema');

router.post('/', async (req, res) => {
    const { pageNo = 1, sortTypeToFetch, ordersPerPage = 25 } = req.body;
    const skip = (pageNo - 1) * ordersPerPage;
    try {
        let query = {};

        if ([ 'Active', 'Draft', 'Out of Stock'].includes(sortTypeToFetch)) {
            query = { "status": sortTypeToFetch };
        } 
        else if(sortTypeToFetch === 'All'){
            query = {}
        }

        const products = await Product.find(query)
            .sort({ 'arrivalMonth': -1 })
            .skip(skip)
            .limit(ordersPerPage);
        const totalProducts = await Product.countDocuments(query);
        
        res.status(200).json({ products, totalProducts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
