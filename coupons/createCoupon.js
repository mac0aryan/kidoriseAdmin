const express = require('express');
const router = express.Router();
const Coupon = require('../schemas/couponSchema');

// @route   POST /api/coupons
// @desc    Create a new coupon
// @access  Admin only (assumes middleware handles auth)
router.post('/', async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      usageLimit,
      perUserLimit,
      stackable,
      appliesTo,
      minCartValue,
      maxDiscountValue,
      expiresAt,
      status,
      createdBy,
    } = req.body;

    // Basic validation
    if (!code || !discountType || !discountValue || !expiresAt || !createdBy) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

    // Check for duplicate coupon code
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: 'Coupon code already exists.' });
    }

    const newCoupon = new Coupon({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      usageLimit,
      perUserLimit,
      stackable,
      appliesTo,
      minCartValue,
      maxDiscountValue,
      expiresAt,
      status,
      createdBy
    });

    const saved = await newCoupon.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Coupon creation error:', error);
    res.status(500).json({ message: 'Server error. Could not create coupon.' });
  }
});

module.exports = router;
