import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import Navbar from "../header/Navbar";
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
    const { productName, available,approved,minBuyQty,purchasePriceOnUnitQty,discount,originPlace} = product;
    
    useEffect(()=>{
        fetchProduct();
        console.log("in useeffect of products changing")
    },[])

    const fetchProduct=async()=>{
        console.log("in fetch")
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
                    console.log("in products got all products")
                    console.log(response)
                    console.log(response.data)
                   setProduct(response.data)
                }
        }catch(err){
            alert(err.response.data.message)
            console.log("in error")
        }
    }

    const onInputChange = (e) => {
            setProduct({ ...product, [e.target.name]: e.target.value });
          };

    const handleSubmit=async(e)=>{
            e.preventDefault();
            const user=JSON.parse(localStorage.getItem("userDetails"));
            console.log("in submit")
            console.log(product)
            let productApproval={productName,available,approved,minBuyQty,purchasePriceOnUnitQty,discount,originPlace}
            console.log(productApproval) 
        try{
            console.log(user)
            const response=await axios.put(``,productApproval,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
                });
                if(response && response.status==200)
                {
                    console.log("in products got all products")
                    console.log(response)
                    console.log(response.status)
                    console.log(response.data)
                }
        }catch(err){
            alert(err.response.data.message)
            console.log("in error")
        }
          }

    return(
        <>
        <form onSubmit={handleSubmit}>
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
            {/* <div className="col-10 offset-3 row">
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
            </div> */}
            {/* <div className="col-10 offset-3 row">
                <div className="col-3">
                    <input className="form-check-input me-1" type="checkbox" name="approved" value={approved} onChange={onInputChange} aria-label="..."/>
                        Approve
                </div>
                <div className="col-5">
                    <input className="form-check-input me-1" type="checkbox" name="available" value={available} onChange={onInputChange} aria-label="..."/>
                        Make Available to customers
                </div>
            </div> */}
            
            <div className="offset-3">
            <button disabled={productName==='' || minBuyQty==0 || purchasePriceOnUnitQty==0 || discount==='' || originPlace===''?true:false} 
                className="btn btn-lg btn-primary submit" type="submit">Submit</button>
            </div>
        </form>
        </>
    );
}
                                                
export default ViewProduct;





    // useEffect(() => {
    //     setTimeout(() => {
    //         if()

    //     }, 1500);
    // }, []);