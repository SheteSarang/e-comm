const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User.js");
const Product = require("./db/Product.js");
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

app.post("/add-product",async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})
app.get("/products", async (req,resp)=>{
    let products = await Product.find();
    if(products.length>0){
        resp.send(products);
    }else{
        resp.send({result: "No products found"})
    }
})
app.delete("/delete-product/:id", async (req, resp) => {
    const { id } = req.params; // Get the product ID from the URL

    try {
        // Find and delete the product by its ID
        const result = await Product.findByIdAndDelete(id);
        
        if (result) {
            resp.send({ result: "Product deleted successfully" });
        } else {
            resp.send({ result: "Product not found" });
        }
    } catch (error) {
        resp.status(500).send({ error: "Error deleting product" });
    }
});
app.get("/product/:id", async (req, resp) => {
   
 let result = await Product.findOne({ _id:req.params.id})  
 if(result){
    resp.send(result)
 }else{
    resp.send({result:"NO RECORD FOUND"})
 }
})

app.put("/product/:id", async (req,resp)=>{
let result = await Product.updateOne({ _id:req.params.id},{$set : req.body})
resp.send(result)
})

app.get("/search/:key", async (req, resp)=>{
    
    // let result = await Product.find({                           //Taking an obj in find function.
    // "$or":[
    //     {name:{$regex:req.params.key}},
    //     {price:{$regex:req.params.key}},
    //     {category:{$regex:req.params.key}},
    //     {company:{$regex:req.params.key}}
    // ]                                                            //whenever you're searching in more than one field, you need $or
    // });
    const searchKey = req.params.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    let result = await Product.find({
        "$or": [
            { name: { $regex: searchKey, $options: "i" } },     // Case-insensitive search for name
            { price: { $regex: searchKey, $options: "i" } },    // Case-insensitive search for price
            { category: { $regex: searchKey, $options: "i" } }, // Case-insensitive search for category
            { company: { $regex: searchKey, $options: "i" } }   // Case-insensitive search for company
        ]
    });
    resp.send(result)
})

app.get("/")
app.listen(5000);