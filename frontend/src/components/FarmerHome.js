import React from "react";
import { Link } from "react-router-dom";

const FarmerHome=()=>{
    return(
        <>
            <button><Link className="nav nav-item nav-link" to="/productList/addProduct">Add New Product</Link></button>
        </>
    );
}
                                                
export default FarmerHome;