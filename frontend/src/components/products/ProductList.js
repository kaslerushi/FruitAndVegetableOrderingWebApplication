import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Navbar from "../header/Navbar";
import { useContext } from "react";

// import AuthContext from "../context/AuthProvider";
import axios from "../../api/axios";

//   const { name, username, email, phone, website } = user;
//   const onInputChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };
// const [users, setUser] = useState([]);




const ProductList=()=>{
    console.log("in productsList")
    const [products, setProducts] = useState({
            productName: "",
            pricePerUnitQty: 0,
            qtyRemaining: 0,
            purchaseDate: "",
            approved: false,
            paid:false,
            img:""
          });
          //add discount and purchasePriceOnUnitQty and also indexing and avg rating if possible
    const { productName, pricePerUnitQty, qtyRemaining, purchaseDate, approved,paid} = products;
    const user=JSON.parse(localStorage.getItem("userDetails"));

    useEffect(()=>{
        fetchProducts();
        console.log("in useeffect of products changing")
    },[])

    const deleteProduct=async(id)=>{
        // setMessage('') 
        // setError('')
        console.log("in delete method")
        try{
            const response=await axios.delete(`/admin/allProducts/delete/${id}`,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
              
                });
                if(response && response?.data)
                {
                    console.log("in response")
                    console.log(response)
                    fetchProducts();
                }
        }catch(err){
            // setError(err);
            console.log(err)
        }
    }
   
    const fetchProducts = async()=>{
        // setError('');
        console.log("in products fetching")
        try{
            const response=await axios.get('/admin/allProducts',{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                });
                if(response && response?.data)
                {
                    console.log("in products got all products")
                    console.log(response)
                    console.log(response.data)
                    // setUser(result.data.reverse());
                   setProducts(response.data.reverse())
                }
        }catch(err){
            alert(err.response.data.message)
            console.log("in error")
        }
    }

    return(
        <>
            {/* <button type="button" onClick={fetchProducts}>Get List Of Products</button> */}
            {/* <p ref={errorRef} classNameName={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
            <p ref={messageRef} classNameName={message?"":"offscreen"}> {message} </p> */}
            <button><Link className="nav nav-item nav-link" to="/productList/addProduct">Add New Product</Link></button>
            {products.length?(
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <td>Product Name</td>
                            <td>PricePerUnitQty</td>
                            <td>Qty Remaining</td>
                            <td>Purchase Date</td>
                            <td>Approved</td>
                            <td>Paid</td>
                            <td>image</td>
                            <td>operation1</td>
                            <td>operation2</td>
                            <td>operation3</td>
                            {/* <td>operation4</td> */}
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index)=>(
                         <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td>{product.pricePerUnitQty}</td>
                            <td>{product.qtyRemaining}</td>
                            <td>{product.purchaseDate}</td>
                            <td>{product.approved?"yes":"no"}</td>
                            <td>{product.paid?"yes":"no"}</td>
                            <td ><img src={product.img} style={{width:'100px',height:'100px'}}alt="not found"></img></td>
                            <td><Link className="btn btn-primary mr-2" to={`productList/viewProduct/${product.id}`}>View</Link></td>
                            <td><Link className="btn btn-success mr-2" to={`productList/approveProduct/${product.id}`}>Approve</Link></td>
                            {/* <Link className="btn btn-secondary mr-2" to={`/users/${user.id}`}>Edit</Link> */}
                            <td><Link className="btn btn-danger mr-2" id={product.id} to="/productList" onClick={(e) => deleteProduct(e.target.id)}>Delete</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ):(
                <h1>No products to show in inventory</h1>
            )} 
        </>
    );
}                    
export default ProductList;


{/* <td><button type="button" classNameName="btn btn-primary" id={product.id} onClick={(e)=>deleteCategory(id)}>Details</button></td>
                            <td><button type="button" classNameName="btn btn-success" id={product.id} onClick={(e)=>deleteCategory(id)}>Approve</button></td>
                            <td><button type="button" classNameName="btn btn-secondary" id={product.id} onClick={(e)=>deleteCategory(id)}>Edit</button></td>
                            <td><button type="button" classNameName="btn btn-danger" id={product.id} onClick={(e)=>deleteCategory(id)}>Delete</button></td> */}