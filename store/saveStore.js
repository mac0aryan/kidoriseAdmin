const express= require('express');
const router= express.Router();
const Store= require('../schemas/storeDetailsSchema');

router.post('/',async(req,res)=>{
    const {selectedCurrency, prefix, suffix}= req.body;
    console.log(suffix,prefix)

    try {
        const store= await Store.findOne({});
        store.storeCurrency= selectedCurrency;
        store.orderID.prefix=prefix;
        store.orderID.suffix=suffix;
        await store.save();
        res.status(200).json({"Message":"Store Info Saved Successfully"});
    } catch (error) {
        res.status(500).json({"Message":"Internal Server Error"});
    }
});
module.exports= router;