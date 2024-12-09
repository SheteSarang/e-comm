
import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
  // Data collection from Frontend
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    console.warn(params)
    getProductDteails();
  },[params])

  const getProductDteails = async () =>{
    console.warn(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }

  const updateProduct = async () => {
    console.warn(name,price,category,company)
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: 'PUT',
        body: JSON.stringify({name,price,category,company}),
        headers: {
            'Content-Type' : "application/json"
        }
    }); result = await result.json()
    console.warn(result);
    navigate('/')
  };

  return (
    <div className="product">
      <h1>update Product</h1>
      <div>
        <input
          type="text"
          required
          placeholder="Enter product Name"
          className="inputbox-addproduct"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Enter product Price"
          className="inputbox-addproduct"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product Category"
          className="inputbox-addproduct"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product Company"
          className="inputbox-addproduct"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button onClick={updateProduct} className="buttonaddproduct">
          Update Product{" "}
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
