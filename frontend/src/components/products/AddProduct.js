import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const AddProduct=()=>{
    const history=useHistory()
    const errorRef= useRef('');
    const messageRef= useRef('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [productName, setProductName] = useState('');
    const [totalQty, setTotalQty] = useState(0);
    const [isOrganic, setIsOrganic] = useState(false);
    const [variety, setVariety] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [varieties, setVarieties] = useState([]);
    const [priceChecked, setPriceChecked] = useState(false);
    const [tempObj, setTempObj] = useState({});
    const {role} = useContext(AuthContext);
    let categoriesList = useRef([]);
    
    const user=JSON.parse(localStorage.getItem("userDetails"));
   
    let minQty=0;
    let minPrice=0;
    let defUnit='unit';
    let tempVariety='';

    useEffect(()=>{
        axios.get('/farmer/categories',{
            auth: {
                username:user.email,
                password:user.password
              }
      }).then((response)=>{
        categoriesList.current=response.data;
        let result = categoriesList.current.map(c => c.mainCategory);
        let result1=result.filter((r,i)=>result.indexOf(r)===i)
        setMainCategories(result1);
        })
    },[]);
    
    const handleSubCategories=(e)=>{
        setMainCategory(e.target.value)
        setTotalQty(0);
        minQty=0;
        minPrice=0;
        defUnit='unit';
        let result=categoriesList.current.map((c)=>c.mainCategory===(e.target.value)?c.subCategory:'')
        result=result.filter((m,i)=>m!=='' && result.indexOf(m)==i)
        setSubCategories(result)
    }

    const handleVarieties=(e)=>{
        setSubCategory(e.target.value)
        setVariety('');
        setTotalQty(0)
        let result=categoriesList.current.map((c)=>c.subCategory===(e.target.value)?c.variety:'')
        result=result.filter((m)=>m!=='')
        setVarieties(result)
    }
    
    useLayoutEffect(() =>{
            setVarieties([])
        }, [subCategories]);


    const handleVariety=(e)=>{
        minQty=0;
        minPrice=0;
        defUnit='unit' 
        tempVariety=e.target.value;
        setVariety(e.target.value)
        if(tempVariety)
        {
        let tempCategory=categoriesList.current.find((c)=>c.variety===tempVariety);
        minQty=tempCategory.miniSellQty;
        setTotalQty(minQty);
        minPrice=tempCategory.minSellPrice
        defUnit=tempCategory.defaultUnit
        setTempObj({minQty,minPrice,defUnit})
        }
    }

    const handleIsOrganic=(e)=>{
        if(isOrganic)
        {
        setIsOrganic(false)
        }
        else{
            setIsOrganic(true)
        }
    }

    useEffect(()=>{
        if(subCategory && variety && totalQty)
        {
            setMessage(`You will get ${totalQty*(tempObj.minPrice)} RS for this order with ${tempObj.minPrice} RS per ${tempObj.defUnit}`)       
        }
    },[totalQty,variety])

    const handlePrice=(e)=>{
        setTotalQty(e.target.value)
        if(variety && subCategory)
        {
            setMessage(`You will get ${totalQty*(tempObj.minPrice)} RS for this order with ${tempObj.minPrice} RS per ${tempObj.defUnit}`)       
        }else{
            setMessage('')
        }
    }

    const handleSubmit=async(e)=>{
       e.preventDefault();
        setMessage('')
        setError('');
        const email=user.email;
        const productInfo={mainCategory,subCategory,variety,productName,totalQty,isOrganic,email}
        try{
            const response=await axios.post('/farmer/addProduct',productInfo,{
                auth: {
                    username:user.email,
                    password:user.password
                    }
                });
                if(response && response?.data)
                {
                    if(role=='ROLE_FARMER')
                    {
                        history.push("/FarmerHome")
                    }else{
                        history.push("/productList")
                    }
                    
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return(
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-5 offset-3 divGapDown">
                        <label className="form-label label">Select Main Category</label>
                    <select id="1" className="form-select " aria-label="Default select example"
                    onChange={(e)=>handleSubCategories(e)}>
                        <option >Select Main Category</option>
                            {mainCategories.length?(mainCategories.map((m,index)=>
                                <option  key={index} value={m}>{m}</option>
                                )
                            ):(
                                <option value=''></option>
                            )
                            }
                    </select>
                </div>
                <div className="col-5 offset-3 divGapTop">
                    <label className="form-label label">Select Sub Category</label>
                    <select id="2" className="form-select " aria-label="Default select example"
                    onChange={(e)=>handleVarieties(e)}>
                    <option >Select Sub Category</option>
                            {subCategories.map((s,index)=>
                                <option key={index} value={s}>{s}</option>
                                )
                            }
                    </select>
                </div>
                <div className="col-5 offset-3 divGapTop" >
                    <label className="form-label label">Select Variety</label>
                    <select id="3" className="form-select " aria-label="Default select example"
                    onChange={(e)=>handleVariety(e)}>
                        <option >Select variety</option>
                        {
                            varieties.map((v,index)=>
                            <option key={index} value={v}>{v}</option>
                            )
                    }
                    </select>
                </div>
                <div className="mb-3 col-5 offset-3 divGapTop" >
                    <label htmlFor="productName" className="form-label label">Product Name</label>
                    <textarea value={productName} className="form-control" required placeholder='Enter Product Name' 
                    id="productName" rows="2" maxLength={59} onChange={(e)=>setProductName(e.target.value)}/>
                </div>
                <div className="col-2 offset-3 divGapTop">
                    <label htmlFor="totalQty" className="form-label label">Total Quantity</label>
                    <input value={totalQty} min="1" type="number" required placeholder='Enter Total Qty' 
                    className="form-control" id="totalQty" onChange={handlePrice}/>
                    <input className="form-check-input" type="checkbox" value={isOrganic} id="isOrganic"
                    onChange={handleIsOrganic} />
                    <label className="form-check-label" htmlFor="isOrganic">
                        Organic
                    </label>
                </div>
                <div className="col-12 offset-3 divGapTop">
                    <button disabled={priceChecked===''|| mainCategory==='' || subCategory==='' || variety==='' || productName==='' || totalQty==0
                     || isOrganic==='' ?true:false} className="btn btn-primary submit" type="submit">Submit</button>
                </div>
            </form>
            <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
            <p ref={messageRef} className={message?"col-5 offset-4 success":"offscreen"}> {message} </p>
        </>
        
    );
}
                                                
export default AddProduct;

