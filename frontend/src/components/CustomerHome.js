import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./header/Navbar";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const CustomerHome=()=>{
    const {auth}=useContext(AuthContext);
    // console.log(auth);
    // const [user, setUser] = useState({});
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("userDetails");
    //     if (loggedInUser) {
    //       console.log(loggedInUser);
    //       // setUser(JSON.parse(JSON.stringify(localStorage.getItem("userDetails"))));
    //       setUser(JSON.parse(localStorage.getItem("userDetails")));
    //       // setUser(foundUser);
    //       // console.log(foundUser);
    //     }
    //   }, []);
    


    return(
        <>
            {/* {user.getItem("email")} */}
            {/* {auth.email} */}
            <p>hii  welcome to customer page</p>
        </>
    );
}
                                                
export default CustomerHome;