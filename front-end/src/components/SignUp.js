
import React,{useState} from 'react'
//this is used for navigate to some page
import { useNavigate } from 'react-router-dom';

const SignUp = ()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

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