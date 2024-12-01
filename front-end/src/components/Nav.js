import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
const Nav=()=>{
    // 1.now this line down below is for- <li>{ auth ? <Link to="/logout">logout</Link>:<Link to="/Register">SignUp</Link>}</li>
    //if signedup -->signin button visible. If not signedin--> logout button not visible.. method is checking local storage .
    //2.For logout functionality, oonce logout, page should redirect to signup. Hence, instead of <Link to="/logout">, write /register.
    const auth= localStorage.getItem('user');
    const navigate = useNavigate(); // used to rerender the component after every chamge is detected
    const logout =()=>{
        localStorage.clear();
        navigate('/Register') // Solution for bug: When logout, Signup button should be visible. But instead logout button was visible. After refresh it was working as expected.Same for signin. Evenif signin, signin button was showing instead of logout.  
    }
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Product</Link></li>
               
                <li><Link to="/profile">Profile</Link></li>
                <li>{ auth ? <Link onClick={logout} to="/Register">logout</Link>:<Link to="/Register">SignUp</Link>}</li>
            </ul>
        </div>
    )
}

export default Nav;