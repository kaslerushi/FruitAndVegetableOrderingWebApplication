import React, { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Axios from "axios";
const ApproveProduct=()=>{
    const {id}=useParams()
    const history=useHistory()
    const [img, setImg] = useState('');
    const [image, setImage] = useState({
        file:[]
    });
    
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
    const user=JSON.parse(localStorage.getItem("userDetails"));

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

    const handleSubmit=async(e)=>{
            e.preventDefault();
            let productApproval={productName,available,approved,minBuyQty,purchasePriceOnUnitQty,discount,originPlace,img}
         
        try{
            const response=await axios.put(`/admin/allProducts/approve/${id}`,productApproval,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                });
                if(response && response.status==200)
                {
                    history.push("/productList")
                }
        }catch(err){
            alert(err.response.data.message)
        }
          }

    const imageUpload = async (e) =>{
            e.preventDefault();
        try{
            const formdata=new FormData();
            formdata.append('file', image.file);
            const response=Axios.post("http://localhost:9090/upload-file",formdata,{   
                auth: {
                    username:user.email,
                    password:user.password
                } 
        });
        
        console.log(response)
        if((await response) && (await response).status==200)
        {
            alert("image uploaded successfully")
            setImg((await response).data)
        }
        
        }catch(err){
            alert(err.response.data.message)
        }
    } 
    const handleImageChange = (event) => {
        setImage({
          ...image,
          file:event.target.files[0],
        });
    
      }
                

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="col-10 offset-3 row ">
                <h2 className="col-5">PRODUCT APPROVAL</h2>
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
            </div>
            <div className="col-10 offset-3 row">
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
            </div>
            <div className="col-10 offset-3 row">
                <div className="col-3">
                    <label htmlFor="discount"  className="form-label label">Discount On Product</label>
                    <input type="number" placeholder='Enter Discount' className="form-control" id="discount"
                       name="discount" value={discount} required onChange={onInputChange} />
                </div>
            </div>
            <div className="col-10 offset-3 row divGapTop">
            
                <div className="col-3 ">
                <label htmlFor="formFile" className="form-label label">Select Image</label>
                    <input className="form-control"  type="file" id="formFile" 
                    onChange={handleImageChange}/>
                </div>
                <div className="col-2 ">
                    <button disabled={image?false:true} 
                    className="btn btn-md btn-primary submit" type="submit" onClick={imageUpload}>Upload</button>
                </div>
            </div>
            <div className="col-10 offset-4 ">
            <button disabled={productName==='' || minBuyQty==0 || purchasePriceOnUnitQty==0 || discount==='' || originPlace===''?true:false} 
                className="btn btn-lg btn-primary submit" type="submit">Submit</button>
            </div>
        </form>
        </>
    );
}
                                                
export default ApproveProduct;

