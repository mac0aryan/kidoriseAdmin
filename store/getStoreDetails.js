const express= require('express');
const router= express.Router();
const Store= require('../schemas/storeDetailsSchema');

router.get('/', async(req,res)=>{
    try {
        const store= await Store.findOne({});
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({"Message":"Internal Server Error"});
    }
});
module.exports= router;