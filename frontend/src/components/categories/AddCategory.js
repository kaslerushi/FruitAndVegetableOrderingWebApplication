import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../header/Navbar";
import { useContext } from "react";

// import AuthContext from "../context/AuthProvider";
import axios from "../../api/axios";

const AddCategory =()=>{
    const history=useHistory()
    const errorRef= useRef('');
    const messageRef= useRef('');
    const startRef= useRef('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [variety, setVariety] = useState('');
    const [defaultUnit, setDefaultUnit] = useState('');
    const [miniSellQty, setMiniSellQty] = useState('');
    const [minSellPrice, setMinSellPrice] = useState('');

    useEffect(()=>{
        startRef.current.focus();
      },[])

    const handleSubmit=async(e)=>{
       e.preventDefault();
        setMessage('')
        setError('');
        const categoryInfo={mainCategory,subCategory,variety,defaultUnit,miniSellQty,minSellPrice}
        const user=JSON.parse(localStorage.getItem("userDetails"));
        try{
            const response=await axios.post('/admin/addCategory',categoryInfo,{
                auth: {
                    username:user.email,
                    password:user.password
                    }
                });
                if(response && response?.data)
                {
                    history.push("/categoryList")
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return(
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6 offset-2">
                    <label htmlFor="mainCategory" className="form-label">Main Category</label>
                    <input ref={startRef} value={mainCategory} type="text" required placeholder='Enter Main Category' 
                    className="form-control" id="mainCategory" onChange={(e)=>setMainCategory(e.target.value)}/>
                </div>
                <div className="col-md-6 offset-2">
                    <label htmlFor="subCategory" className="form-label">Sub Category</label>
                    <input value={subCategory} type="text" required placeholder='Enter Sub Category' 
                    className="form-control" id="subCategory" onChange={(e)=>setSubCategory(e.target.value)}/>
                </div>
                <div className="col-md-6 offset-2">
                    <label htmlFor="variety" className="form-label">Variety</label>
                    <input value={variety} type="text" required placeholder='Enter Variety' 
                    className="form-control" id="variety" onChange={(e)=>setVariety(e.target.value)}/>
                </div>
                <div className="col-md-3 offset-2">
                    <label htmlFor="defaultUnit" className="form-label">Default Unit</label>
                    <input value={defaultUnit} type="text" required placeholder='Enter Default Unit' 
                    className="form-control" id="defaultUnit" onChange={(e)=>setDefaultUnit(e.target.value)}/>
                </div>
                <div className="col-md-2 offset-1">
                    <label htmlFor="miniSellQty" className="form-label">Minimum Sell Quantity</label>
                    <input value={miniSellQty} type="number" required placeholder='Enter Minimum Qty' 
                    className="form-control" id="miniSellQty" onChange={(e)=>setMiniSellQty(e.target.value)}/>
                </div>
                <div className="col-md-3 offset-2">
                    <label htmlFor="minSellPrice" className="form-label">Minimum Sell Price</label>
                    <input value={minSellPrice} type="number" required placeholder='Enter Minimum Sell Price' 
                    className="form-control" id="minSellPrice" onChange={(e)=>setMinSellPrice(e.target.value)}/>
                </div>
                <div className="col-12 offset-2">
                    <button disabled={mainCategory==='' || subCategory==='' || variety==='' || defaultUnit==='' || miniSellQty===''
                     || minSellPrice==='' ?true:false} className="btn btn-primary submit" type="submit">Submit</button>
                </div>
            </form>
            
            <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
                <p ref={messageRef} className={message?"":"offscreen"}> {message} </p>
            
        </>
        
    );
}
                                                
export default AddCategory;