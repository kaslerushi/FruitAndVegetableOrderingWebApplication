import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const ViewProduct=()=>{
    const {id}=useParams()
    
    const [product, setProduct] = useState({
        productName: "",
        available:false,
        approved: false,
        minBuyQty:0,
        purchasePriceOnUnitQty:0,
        discount:0,
        originPlace:"",
      });
    const { productName,minBuyQty,purchasePriceOnUnitQty,discount,originPlace} = product;
    
    useEffect(()=>{
        fetchProduct();
    },[])

    const fetchProduct=async()=>{
        const user=JSON.parse(localStorage.getItem("userDetails"));
        try{
            const response=await axios.get(`/admin/allProducts/${id}`,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                });
                if(response && response?.data)
                {
                   setProduct(response.data)
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }

    const onInputChange = (e) => {
            setProduct({ ...product, [e.target.name]: e.target.value });
          };

    return(
        <>
        <form >
            <div className="col-10 offset-3 row ">
                <h2 className="col-5">PRODUCT DETAILS</h2>
            </div>
            <div className="col-10 offset-3 row ">
                <div className="mb-3 col-4">
                    <label htmlFor="productName" className="form-label label">Product Name</label>
                    <textarea value={productName} className="form-control" required placeholder='Enter Product Name' 
                    name="productName" id="productName" rows="2" maxLength={59} onChange={onInputChange}/>
                </div>
            </div>
            <div className="col-10 offset-3 row">
                <div className="col-4">
                    <label htmlFor="originPlace" className="form-label ">Origin Place</label>
                    <input type="text" placeholder='Enter Origin Place' className="form-control" id="originPlace"
                       name="originPlace" value={originPlace==null?"":originPlace} required  onChange={onInputChange}/>
                </div>
                <div className="col-3">
                    <label htmlFor="purchasePriceOnUnitQty"  className="form-label label">Purchase Price On unit Qty</label>
                    <input type="number" placeholder='Enter Purchase Price' className="form-control" id="purchasePriceOnUnitQty"
                       name="purchasePriceOnUnitQty" value={purchasePriceOnUnitQty} required onChange={onInputChange} />
                </div>
            </div>
            <div className="col-10 offset-3 row">
            <div className="col-3">
                    <label htmlFor="minBuyQty"  className="form-label label">Minimum Buy Qty</label>
                    <input type="number" placeholder='Enter Minimum Buy Qty' className="form-control" id="minBuyQty"
                       name="minBuyQty" value={minBuyQty} required  onChange={onInputChange}/>
                </div>
                <div className="col-3">
                    <label htmlFor="discount"  className="form-label label">Discount On Product</label>
                    <input type="number" placeholder='Enter Discount' className="form-control" id="discount"
                       name="discount" value={discount} required onChange={onInputChange} />
                </div>
            </div>
           
        </form>
        </>
    );
}
                                                
export default ViewProduct;
