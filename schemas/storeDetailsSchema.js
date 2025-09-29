const mongoose= require('mongoose');

const storeDetailsSchema= new mongoose.Schema({
    storeID:{
        type:String,
        default:'001'
    },
    storeName:{
        type:String,
        default:""
    },
    storePhone:{
        type:String,
        default:""
    },
    storeEmail:{
        type:String,
        default:""
    },
    billingInformation: {
        selectedCountry: { type: String },
        address: { type: String},
        appartment: { type: String },
        city: { type: String },
        state: { type: String},
        pinCode: { type: String},
        phone: { type: String}
    },
    storeCurrency: {
        type:String,
        default:'Indian Rupee (INR)'
    },
    orderID:{
        prefix:{
            type:String,
            default:""
        },
        suffix:{
            type:String,
            default:""
        }
    },
    // tables : [tableSchema]
});
module.exports= mongoose.model('Store', storeDetailsSchema);