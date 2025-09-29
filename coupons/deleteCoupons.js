const express = require('express');
const router = express.Router();
const Coupon = require('../schemas/couponSchema');

router.post('/', async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No coupon IDs provided' });
  }

  try {
    const result = await Coupon.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Coupons deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting coupons:', error);
    res.status(500).json({ message: 'Failed to delete coupons' });
  }
});

module.exports = router;
