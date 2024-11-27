
import React,{useState} from 'react'
const SignUp = ()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const collectData=()=>{
        console.warn(name,email,password)
    }
    return(
        <div>
            <h1 className="reg">Register</h1>
            <input className="inputBox" type ="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
            <input className="inputBox" type ="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="inputBox" type ="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="buttoninsignup" type="button">SignUp</button>
        </div>
    )
}

export default SignUp;