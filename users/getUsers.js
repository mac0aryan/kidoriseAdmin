const express= require('express');
const router= express.Router();
const {User}= require('../schemas/userSchema');

router.get('/', async(req,res)=>{
    try {
        const users= await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.send(500).json({"message":"Internal Server Error"})
    }
});
module.exports=router;