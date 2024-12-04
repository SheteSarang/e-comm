import React from 'react';
import {useState} from 'react';
const AddProduct = () => {
    //Data collection from Frontend
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const addProduct=async()=>{
        if(name.trim() !=="" && price.trim() !=="" && category.trim() !=="" && company.trim() !=="" ){
            console.warn(name,price,category,company);
            const userId1 = JSON.parse(localStorage.getItem('user'))._id; // Correct method
            console.warn(userId1);
            
            let result = await fetch('http://localhost:5000/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category,userID :userId1, company}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            result = await result.json();
            console.warn(result);
        }else{
            alert("Either of the filed is blank.")
        }
    }
    return ( 
        <div className='product'>
            <h1>Add Product</h1>
            
                <input type="text" required={true} placeholder="Enter product Name"className="inputbox-addproduct"value={name}onChange={(e)=>setName(e.target.value)}/>
                <input type="text" required={true} placeholder="Enter product Price"className="inputbox-addproduct"value={price}onChange={(e)=>setPrice(e.target.value)}/>
                <input type="text" placeholder="Enter product Category"className="inputbox-addproduct"value={category}onChange={(e)=>setCategory(e.target.value)}/>
                <input type="text" placeholder="Enter product Company"className="inputbox-addproduct"value={company}onChange={(e)=>setCompany(e.target.value)}/>
                <button onClick={addProduct} className="buttonaddproduct">Add Product</button>
        </div>
    );
};
export default AddProduct;
