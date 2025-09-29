const jwt=require('jsonwebtoken');
const secret="this is the one for all dont get confused";
const generateToken=(user)=>{
    const payload={
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        gender: user.gender

    }
    return jwt.sign(payload,secret);
}
module.exports=generateToken;