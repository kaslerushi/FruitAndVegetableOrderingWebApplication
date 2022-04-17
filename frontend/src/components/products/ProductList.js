import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

const ProductList=()=>{
    const [products, setProducts] = useState({
            productName: "",
            pricePerUnitQty: 0,
            qtyRemaining: 0,
            purchaseDate: "",
            approved: false,
            paid:false,
            img:""
          });
    const user=JSON.parse(localStorage.getItem("userDetails"));

    useEffect(()=>{
        fetchProducts();
    },[])

    const deleteProduct=async(id)=>{
        try{
            const response=await axios.delete(`/admin/allProducts/delete/${id}`,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
              
                });
                if(response && response?.data)
                {
                    fetchProducts();
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }
   
    const fetchProducts = async()=>{
        try{
            const response=await axios.get('/admin/allProducts',{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                });
                if(response && response?.data)
                {
                   setProducts(response.data.reverse())
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return(
        <>
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
