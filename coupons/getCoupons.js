const express = require('express');
const router = express.Router();
const Coupon = require('../schemas/couponSchema');

router.get('/', async(req, res)=>{
    try {
        const data = await Coupon.find({});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Server error. Could not fetch coupons.' })
    }
})

module.exports = router;