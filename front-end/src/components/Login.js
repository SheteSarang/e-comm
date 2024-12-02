import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  //once login, login button shouldn't be visibe. with the help of URL it can be seen. So to avoid this testcase, check localstorage.
  useEffect(()=>{                
    const auth= localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
})
  // Define the handleLogin function
  const handleLogin = async () => {
    console.warn(email, password);
    //API Integration
    let result = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }});
        result = await result.json();  //we're getting result in string format. So converting it to JSON
        console.warn(result); 
        if (result.name){
          localStorage.setItem("user", JSON.stringify(result));
            navigate('/')

        }else{
          alert("Please enter correct details or if new, please signin")
        }
  };

  return (
    <div className="Login">
      <h1 className="reg">Login</h1>
      <input type="text" className="inputBox" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" className="inputBox" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin} className="buttoninsignup" type="button">  Login </button>
    </div>
  );
};

export default Login;
