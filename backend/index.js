const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User.js");
const app = express();
app.use(express.json());
app.use(cors());
//API to register
app.post("/Register", async (req,resp)=>{
    console.log("connected")
    const {name, email, password} = req.body ;
    console.log(req)
    let user= new User({name, email, password});
    let result = await user.save();
    console.log(user)
    resp.send(result);
});

// app.post("/register", async (req,resp)=>{
//     console.log("connected")
//     let user= await User.create(req.body);
//     if(!user){
//         console.log("User Not Created")
//     }
//     resp.send(user);
// });

app.listen(5000);