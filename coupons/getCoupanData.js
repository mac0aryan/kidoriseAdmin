const express= require('express');
const router= express.Router();
const Products= require('../schemas/couponSchema');

router.get('/:couponCode',async(req,res)=>{
    const couponCode =req.params.couponCode;
    try {
        const data= await Products.findOne({
            code: couponCode
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
    }
});
module.exports= router;