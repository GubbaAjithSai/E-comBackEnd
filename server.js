const dotenv=require("dotenv");
const express=require("express");
const app=express();
dotenv.config({path:'./config.env'});
require("./db/conn");
app.use(express.json())
app.use(require("./routers/auth"));

app.listen(3000,()=>{
    console.log("server connected...");
})