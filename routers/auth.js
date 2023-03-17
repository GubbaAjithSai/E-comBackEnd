const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken");
const user=require("../model/schema")
const bcrypt=require("bcrypt");
router.get("/",(req,res)=>{
    res.send("hi dude")
})
router.post("/signup",async(req,res)=>{
    try {
        const data=new user(req.body);
        const newUser=await data.save();
        res.send({"msg":"successful reg.."}) ;
    } catch (error) {
        res.status(422).send(error);
        console.log(error);
    }
})
router.get("/logout",(req,res)=>{
    res.clearCookie("jwt");
    res.send({"msg":"removed"})
})
// router.get("/jwt",(req,res)=>{
//     const token=req.cookies.jwt;
//     const verifyUser=jwt.verify(token,process.env.secret_key);
//     res.send(verifyUser)
//     console.log(verifyUser)
// })
router.post("/login",async(req,res)=>{
    try {
        const {email,password}=await req.body;
        if(!email || !password){
            res.send({"msg":"enter required fields"})
        }
        const userFound=await user.findOne({email})
        if (userFound) {
            const flag=await bcrypt.compare(password,userFound.password);
            const token=await userFound.generateAuthtoken();
            if (flag){
                res.cookie("jwt",token);
                res.json({"msg":"loggedIn successfully..."})
            }else{
                res.status(400).send({"message":"invalid credentials"})
            }
        } else {
            res.status(400).send({"message":"invalid credentials"})
        }
    } catch (error) {
       console.log(error);
    }
})

module.exports=router;
