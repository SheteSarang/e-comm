
import React,{useEffect, useState} from 'react'
//this is used for navigate to some page
import { useNavigate } from 'react-router-dom';  //react hook

const SignUp = ()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
// Once, user is signedup, he should not be able to naviigate to the button again. So if you click on the signup button again, you will be navigated to home page i.e products
    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData=async ()=>{
        console.warn(name,email,password);
        let result = await fetch('http://localhost:5000/Register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        //Now after singin data successfully entered into db, redirect to specific path.
        if(result)
        {
            //local storage. To check it, go to inspect, application, local storage.j
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')
        }
    }
    return(
        <div>
            <h1 className="reg">Register</h1>
            <input className="inputBox" type ="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
            <input className="inputBox" type ="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="inputBox" type ="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="buttoninsignup" type="button">SignUp</button>
        </div>
    )
}

export default SignUp;