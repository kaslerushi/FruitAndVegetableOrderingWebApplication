import React from "react";
import { useState,useRef,useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
const Login=()=>{

  const {loggedIn,role,startVisit,setLoggedIn,setRole,setStartVisit} = useContext(AuthContext);
  const history=useHistory();  
  
  // const [userRole, setUserRole] = useState('ROLE_CUSTOMER');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const errorRef= useRef('');
  const startRef= useRef('');

  const [error,setError]=useState('');

  useEffect(()=>{
    startRef.current.focus();
  },[])
  useEffect(()=>{
    console.log("loggedIN:",loggedIn);
    console.log("first time for login page")
    },[]);

  useEffect(()=>{
    setError('');
  },[email,password])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log({role,email,password});
    try{
      //  const user={email,password};
      //const response=axios.post("/login",user);
      
      const response=await axios.get('/api/login',{
            auth: {
                username:email,
                password:password
              }
        })
      if(response.status==200){
          const userinfo={email};
          console.log(userinfo,email)
          const response1=await axios.post('/api/roles',userinfo,{
            auth: {
                username:email,
                password:password
              }
            });
            console.log("hello")
            console.log(response1);
            if(response1.status==200)
            {
              console.log("got the roles")
              console.log(response1);
              console.log(response1.data);
              let user=response1.data;
              console.log(user);
              user.password=password;
             localStorage.setItem("userDetails",JSON.stringify(user));
             console.log("date set to localstorage");
             setLoggedIn(true);
            console.log("date set to localstorage");
             setRole(response1.data.role);

             console.log("role set to useContext")
             setStartVisit(false);
             console.log("all context data set")
             console.log(loggedIn,role,startVisit)
            //  if(JSON.parse(localStorage.getItem("userDetails")).role==="ROLE_ADMIN")
            if(response1.data.role==="ROLE_ADMIN")
             {
               console.log("admin role checking")
              history.replace("/AdminHome");
              console.log("redirecting to ad role")
             }
             else if(response1.data.role==="ROLE_CUSTOMER")
             {
              console.log("cust role checking")
              history.replace("/CustomerHome");
              console.log("redirecting to cu role")
             }
             else if(response1.data.role==="ROLE_FARMER"){
              console.log("farmer role checking")
              history.replace("/FarmerHome");
              console.log("redirecting to fa role")
             }
              
            }
            else{
              console.log("in else")
              setError('dont have access to AdminLogin page')
            }
        }
        else{
          console.log("login failed msg setting")
          setError('Login Failed');
        }
      
    }catch(err){
      alert(err.response.data.message)
      console.log("in error")
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
              {/* <Link to={localStorage.getItem.role==='ROLE_CUSTOMER'?'/CustomerHome':'/FarmerHome'}>Go to Home Page</Link> */}
            </div>
          )}
      </>
    )
}

export default Login;