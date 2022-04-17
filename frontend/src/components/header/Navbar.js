//rafce
import React, { useEffect, useState } from 'react'
import { Link,useHistory} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from "../../context/AuthProvider";

const Navbar = () => {
const {setAuth,loggedIn,setLoggedIn,role,setStartVisit,setRole} =useContext(AuthContext)
const history=useHistory();
const[cartLength,setCartLength]=useState(0);
useEffect(()=>{
const items=JSON.parse(localStorage.getItem("cart"));
if(items)
{
    setCartLength(items.length)
}
},[]);

const handleLogout =(e) => {
    setAuth(null);
    setLoggedIn(false);
    setStartVisit(true);
    setRole('');
    localStorage.setItem("userDetails",null);
    history.replace('/login');
    
};

  return (
    
    <>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                
                {!loggedIn?(
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link className="nav nav-item nav-link" to="/login">Login</Link>
                                <Link className="nav-item nav-link" to="/register">Register</Link>
                                </ul>
                                ):(
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <Link className="nav nav-item nav-link" to="/">Home</Link>
                 {role==="ROLE_ADMIN"?(<Link className="nav nav-item nav-link" to="/AdminHome">AdminHome</Link>)
                 :(<Link className="nav nav-item nav-link" to="/FarmerHome">FarmerHome</Link>)}
                                        </ul>
                                        
                                        )}
                
                {loggedIn?(
                    <form className="d-flex">
                        <button className="btn btn-outline-success me-2" type="button" onClick={handleLogout}>Logout</button>
                        
                        <button type="button" className="btn btn-primary position-relative" onClick={()=>history.push("/cart")}>
                            Cart
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartLength}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </form>
                                ):null}
                </div>
            </div>
        </nav>
    </div>
   </>      
  ) 
}
export default Navbar;