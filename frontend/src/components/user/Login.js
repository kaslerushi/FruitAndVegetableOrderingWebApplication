import React from "react";
import { useState,useRef,useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
const Login=()=>{

  const {loggedIn,setLoggedIn,setRole,setStartVisit} = useContext(AuthContext);
  const history=useHistory();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const errorRef= useRef('');
  const startRef= useRef('');

  const [error,setError]=useState('');

  useEffect(()=>{
    startRef.current.focus();
  },[])

  useEffect(()=>{
    setError('');
  },[email,password])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response=await axios.get('/api/login',{
            auth: {
                username:email,
                password:password
              }
        })
      if(response.status==200){
          const userinfo={email};
          const response1=await axios.post('/api/roles',userinfo,{
            auth: {
                username:email,
                password:password
              }
            });
            if(response1.status==200)
            {
              let user=response1.data;
              user.password=password;
             localStorage.setItem("userDetails",JSON.stringify(user));
             setLoggedIn(true);
             setRole(response1.data.role);
             setStartVisit(false);
            if(response1.data.role==="ROLE_ADMIN")
             {
              history.replace("/AdminHome");
             }
             else if(response1.data.role==="ROLE_CUSTOMER")
             {
              history.replace("/");
             }
             else if(response1.data.role==="ROLE_FARMER"){
              history.replace("/FarmerHome");
             }
              
            }
            else{
              setError('dont have access to AdminLogin page')
            }
        }
        else{
          setError('Login Failed');
        }
      
    }catch(err){
      alert(err.response.data.message)
      if(!err?.response){
        setError('No Server Response');
      }
      else if(err.response?.status===401)
        {
          setError('Login Failed')
        }
      
    }
};

    return (
      <>
        {!loggedIn?(
          <div>
            <h2 className="col-3 offset-4">LOGIN FORM</h2>
            <form onSubmit={handleSubmit}>
              <div className="col-3 offset-4">
              <label htmlFor="email" className="form-label label">Email</label>
                <input ref={startRef} type="text" placeholder='Enter Email-ID' className="form-control" id="email" 
                      value={email} required onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="col-3 offset-4">
              <label htmlFor="password" className="form-label label">Password</label>
                <input type="password" placeholder='Enter password' className="form-control" id="password" 
                      value={password} required onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
              <div className="col-3 offset-5">
                <button disabled={email==='' || password==='' ?true:false}
                        className="btn btn-primary submit" type="submit">Login</button>
              </div>
              <div className="col-4 offset-4">
                <p>Not a User? <Link to="/register">Create Account</Link></p>
              </div>
            </form>
          </div>):(
            <div className="col-4 offset-4">
              <p ref={startRef}>Already Logged In</p>
            </div>
          )}
      </>
    )
}

export default Login;