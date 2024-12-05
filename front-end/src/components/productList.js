import React, { useState, useEffect } from 'react';

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

    // Conventional way with a for loop
    const renderProducts = () => {
        const rows = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td> {/* Sr.No column */}
                    <td>{product._id}</td> {/* ID column (left aligned) */}
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.company}</td>
                </tr>
            );
        }
        return rows;
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
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        renderProducts()
                    ) : (
                        <tr>
                            <td colSpan="6">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
