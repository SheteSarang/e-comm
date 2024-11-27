import React from 'react';
import { Link } from 'react-router-dom';
const Nav=()=>{
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/logout">logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/Register">SignUp</Link></li>
            </ul>
        </div>
    )
}

export default Nav;