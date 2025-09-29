const mongoose= require('mongoose');

const dbConnect=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/Kidorise');
    console.log("connected top db");
}
module.exports=dbConnect;