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
    console.log(req);
    let user= new User({name, email, password});
    let result = await user.save();
    result = result.toObject();  //To hide the password from external world. Make a object of result & delete password before sending resp.
    delete result.password;                     
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

app.post("/login", async (req,resp)=>{
    console.log(req.body);
    if (req.body.password && req.body.email) //while checking if user exist or not in DB, user must enter email & password both. 
    {
    let user = await User.findOne(req.body).select("-password");   //Login functionality. user's credentials exist in database or not, it will check it findOne method will check it. And send back 200 OK. select("-password") will hide the password from external world.
    if(user){                                                      
    resp.send(user);
    }else{
        resp.send({result:'No user found'});
    }
    }else{
        resp.send({result:'Both email & password fields are required'});
    }
})

app.listen(5000);