const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    areaNstreet: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    alternatePhone: {
        type: String
    },
    addressType: {
        type: String
    }

});
const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    customer: {
        name: String,
        email: String
    },
    orderDate: Date,
    products: [mongoose.Schema.Types.Mixed],
    orderAmount: {
        type: Number,
        required: true
    },
    coupon: {},
    orderStatus: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    orderLocation: addressSchema
});
const inventorySchema = new mongoose.Schema({
    locationName: String,
    quantity: {
        unavailable: {
            damaged: {
                type: Number,
                default: 0
            },
            qualityControl: {
                type: Number,
                default: 0
            },
            safetyStock: {
                type: Number,
                default: 0
            },
            other: {
                type: Number,
                default: 0
            }
        },
        committed: {
            type: Number,
            default: 0
        },
        available: {
            type: Number,
            default: 0
        }
    }
})
const imageSchema = new mongoose.Schema({
    preview: String
});
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    review: String
});
const productSchema = new mongoose.Schema({
    title: String,
    images: [imageSchema],
    description: {
        specialities: {
            type: Array,
            default: []
        },
        generalInfo: String
    },
    pricing: {
        offerPrice: Number,
        MRP: Number
    },
    quantity: {
        type: Number,
        default: 1
    },
    SKU: String,
    trackQuantity: Boolean,
    continueSellingStockWhenOutOfStock: Boolean,
    inventory: [inventorySchema],
    status: {
        type: String,
        default: "Active"
    },
    variants: Object,
    additionalInfo: {
        brandName: String,
        material: String,
        finishType: String,
        color: String,
        style: String,
        weight: String,
        dimension: String
    },
    productOrganization: {
        productType: String,
        vendor: String,
        collections: {
            type: Array,
            default: []
        }
    },
    reviews: [reviewSchema],
    productRatings: {
        noPeopleRated: {
            type: Number,
            default: 0
        },
        ratings: {
            type: Number,
            default: 0
        }
    },
    arrivalMonth: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    gender: String,
    otp: String,
    cart: [productSchema],
    wishlist: [productSchema],
    addresses: [addressSchema],
    currentAddress: addressSchema,
    currentOrders: [orderSchema],
    orderHistory: [orderSchema]

});
const Address = mongoose.model('Address', addressSchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema)
module.exports = { Address, Order, User, Product };