import React from "react";
import { Link } from "react-router-dom";
const AdminHome=()=>{
    return(
        <>
            <button><Link to="/categoryList">Categories</Link><br/></button><br/>
            <button><Link to="/productList">Products</Link><br/></button>

        </>
    );
}
                                                
export default AdminHome;