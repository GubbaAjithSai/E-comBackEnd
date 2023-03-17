const dotenv=require("dotenv");
const express=require("express");
const app=express();
const cors = require("cors");
dotenv.config({path:'./config.env'});
require("./db/conn");
const PORT=process.env.PORT || 3000
app.use(cors());
app.use(express.json())
app.use(require("./routers/auth"));

app.listen(PORT,()=>{
    console.log("server connected...");
})