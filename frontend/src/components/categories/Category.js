import React, { useState,useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
// import Navbar from "./header/Navbar";
import { useContext } from "react";

// import AuthContext from "../context/AuthProvider";
// import axios from "../../api/axios";


const Category=({category,deleteCategory})=>{
    console.log("in single category ")
    console.log(category)
    return(
        <>
            <tr key={category.id}>
                <td>{category.mainCategory}</td>
                <td>{category.subCategory}</td>
                <td>{category.variety}</td>
                {/* <td><button type="button" className="btn btn-primary" onClick={showCategoryDetails}>Show/Edit</button></td> */}
                <td><button type="button" className="btn btn-danger" id={category.id} onClick={(e)=>deleteCategory(e.target.id)}>Delete</button></td>
            </tr>
        </>
        
    );
}
                                                
export default Category;