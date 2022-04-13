import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./header/Navbar";
import { useContext } from "react";

import AuthContext from "../context/AuthProvider";
const AdminHome=()=>{
    console.log("in admin home page")

    return(
        <>
            <button><Link to="/categoryList">Categories</Link><br/></button><br/>
            <button><Link to="/productList">Products</Link><br/></button>

        </>
    );
}
                                                
export default AdminHome;