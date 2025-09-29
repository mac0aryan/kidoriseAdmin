const express= require("express");
const router= express.Router();
const Store= require('../schemas/storeDetailsSchema');

router.post('/', async(req,res)=>{
    const storeEmail= req.body.storeEmail;
    try {
        const store= await Store.findOne({});
        if(!store){
            const newStore= new Store({
                storeEmail:storeEmail
            });
            await newStore.save();
            res.status(200).json({"Message":"Saved Successfully"});
        }
        else{
            store.storeEmail= storeEmail;
            await store.save();
            res.status(200).json({"Message":"Saved Successfully"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({"Message":"Internal Server Error"})
    }
});
module.exports=router;