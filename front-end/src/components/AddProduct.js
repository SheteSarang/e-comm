import React, { useState } from 'react';

const AddProduct = () => {
    // Data collection from Frontend
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [productAdded, setProductAdded] = useState(false); // Track if product is added

    const addProduct = async () => {
        if (name.trim() !== "" && price.trim() !== "" && category.trim() !== "" && company.trim() !== "") {
            console.warn(name, price, category, company);
            const userId1 = JSON.parse(localStorage.getItem('user'))._id; // Correct method
            console.warn(userId1);

            let result = await fetch('http://localhost:5000/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category, userID: userId1, company }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            result = await result.json();
            console.warn(result);

            // Clear form fields and hide the form
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            setProductAdded(true); // Mark product as added
        } else {
            alert("Either of the fields is blank.");
        }
    };

    return (
        <div className='product'>
            {/* Conditionally render the heading */}
            {!productAdded && <h1>Add Product</h1>} {/* Show heading only if the product is not added */}

            {productAdded ? (
                <>
                    <p>Product added successfully!</p>
                    <button
                        style={{
                            backgroundColor: 'skyblue',
                            color: 'black',
                            border: 'none',
                            padding: '10px 20px',
                            cursor: 'pointer',
                        }}
                        onClick={() => window.location.href = "/products"} // Navigate to product list page
                    >
                        Go to List of Products
                    </button>
                </>
            ) : (
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
                    <button onClick={addProduct} className="buttonaddproduct">Add Product </button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
