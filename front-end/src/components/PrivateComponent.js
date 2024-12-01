import { React } from "react";
import {Navigate, Outlet} from "react-router-dom";
//unless and until the user signed in, he should not able to navigate to other routes.he should redirect to signup page.
const PrivateComponent=()=>{
    const auth= localStorage.getItem('user');  //here we are checking whether we have got the register data from user or not.(i.e localstorage.) If not, redirect to signup page.
    return auth?<Outlet />: <Navigate to ="/Register" />
}
export default PrivateComponent