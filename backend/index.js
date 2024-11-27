
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const productSchema= new mongoose.Schema({});
const product= mongoose.model('product',productSchema);
const data = await product.find();
console.warn(data);
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`server is running on port: ${PORT}`);
    })
}).catch(error => console.log("Error: ",error));



