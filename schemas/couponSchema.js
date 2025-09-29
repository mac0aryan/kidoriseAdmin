// models/Coupon.js

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
   description: {
    type: String,
    default: '', // optional but useful for admin and users
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  usageLimit: {
    type: Number, // total number of times coupon can be used
    default: null
  },
  perUserLimit: {
    type: Number, // how many times a single user can use the coupon
    default: 1
  },
  stackable: {
    type: Boolean,
    default: false
  },
  appliesTo: {
    type: [String], // e.g., ['products', 'collections', 'cart']
    default: ['cart']
  },
  minCartValue: {
    type: Number,
    default: 0
  },
  maxDiscountValue: {
    type: Number,
    default: null // optional cap
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  usedCount: {
    type: Number,
    default: 0
  },
  usedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      usedAt: [Date]
    }
  ],
  status: {
    type: String,
    default: 'Active'
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
