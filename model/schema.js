const mongoose=require("mongoose");
const validator = require('validator');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    }
})
user.pre("save",function(next){
    const pass=bcrypt.hash(this.password,10)
    this.password=pass;
    next();
})
user.methods.generateAuthtoken=async function () {
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.secret_key);
        return token;
    } catch (error) {
        console.log(error)
    }
}
module.exports=mongoose.model('E-comUserDetails',user)