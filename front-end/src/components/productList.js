import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    };

    const renderProducts = () => {
        return products.map((product, index) => (
            <tr key={index}>
                <td>{index + 1}</td> {/* Sr.No column */}
                <td>{product._id}</td> 
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.company}</td>
                <td>
                <Link to={"/update/"+product._id} style={{ textDecoration: 'none' }}>    {/* Link to="/update/100" --> This is static id passing  */}
                <button 
                     style={{  backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px',  cursor: 'pointer'  }} >
                     Update
                </button>
                </Link>
                <button 
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', marginRight: '10px', cursor: 'pointer' }}onClick={() => handleDelete(product._id)}>
                        Delete
                </button>
                    
                </td> 
            </tr>
        ));
    };
    const handleDelete = async (catched_ID_of_the_product_sent_through_handleDelete_function) => {
        //  asking a confirmation msg 
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) {
        // If the user clicks "Cancel," stop the deletion process
        return;
    }
        // Send DELETE request to the backend
        let result = await fetch(`http://localhost:5000/delete-product/${catched_ID_of_the_product_sent_through_handleDelete_function}`, {
            method: 'DELETE',
        });

        //  Check if the delete was successful
        if (result.ok) {
            // Update the local state to remove the deleted product. So this local state helps avoid round trips between backend and frontend.
            setProducts(products.filter((product) => product._id !== catched_ID_of_the_product_sent_through_handleDelete_function));
        } else {
            console.error("Failed to delete product");
        }
    };

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <table border="1" style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
                <thead style={{ backgroundColor: 'skyblue', color: 'black' }}>
                    <tr>
                        <th>Sr.No</th> {/* Sr.No column header */}
                        <th>ID</th> {/* ID column header */}
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th></th> {/* Empty header for Delete & Update buttons */}
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        renderProducts()
                    ) : (
                        <tr>
                            <td colSpan="7">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;