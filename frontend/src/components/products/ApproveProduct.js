import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Axios from "axios";
import ProductList from "./ProductList";
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
        console.log("in change")
        console.log(approved,available)
            setProduct({ ...product, [e.target.name]: e.target.value });
            console.log(approved,available)
          };

    const handleSubmit=async(e)=>{
            e.preventDefault();
            // setImage()
            console.log("in submit")
            console.log(product)
            console.log(img)
            let productApproval={productName,available,approved,minBuyQty,purchasePriceOnUnitQty,discount,originPlace,img}
            console.log(productApproval) 
        try{
            const response=await axios.put(`/admin/allProducts/approve/${id}`,productApproval,{
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
                    history.push("/productList")
                }
        }catch(err){
            console.log(err)
            alert(err.response.data.message)
            console.log("in error")
        }
          }

    const imageUpload = async (e) =>{
            // const formdata = new FormData(); 
            // formdata.append('avatar', userInfo.file);
            e.preventDefault();
        try{
            console.log(img)
            const formdata=new FormData();
            console.log(formdata)
            formdata.append('file', image.file);
            console.log(formdata)
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
            console.log((await response).data);
            setImg((await response).data)
            const y=((await response))
            console.log((await response).data);
            console.log(y);
        }
        
        }catch(err){
            alert(err.response.data.message)
            console.log(err)
        }
    } 
    // const formdata = new FormData(); 
    // formdata.append('avatar', userInfo.file);

    // axios.post("http://localhost:8080/imageupload", formdata,{   
    //         headers: { "Content-Type": "multipart/form-data" } 
    // })
    const handleImageChange = (event) => {
        setImage({
          ...image,
          file:event.target.files[0],
        //   filepreview:URL.createObjectURL(event.target.files[0]),
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



// const [img, setImg] = useState({});
// const onImageUpload = async () =>{
//     // const formdata = new FormData(); 
//     // formdata.append('avatar', userInfo.file);
// try{
//     const response=axios.post("http://localhost:8080/imageupload", formdata,{   
//         headers: { "Content-Type": "multipart/form-data" } 
// });
// if((await response).status==200)
// {
//     set
// }

// }catch(err){
//     console.log(err)
// }
    


    // .then(res => { // then print response status
    //   console.warn(res);
    //   if(res.data.success === 1){
    //     setSuccess("Image upload successfully");
    //   }

    // })
//   }



{/* <p>welcome to admins approve page</p> */}
//<div className="list-group"> for checkbox
{/* <label className="list-group-item">
<input className="form-check-input me-1" type="checkbox" value="">
First checkbox
</label> */}

// checkbox = document.getElementById('conducted');

// checkbox.addEventListener('change', e => {

//     if(e.target.checked){
//         //do something
//     }

// });
    // const onCheckboxChange = (e) => {
    //     console.log(e.target.value)
    //     if(e.target.value==true)
    //     {
    //         if(e.target.name==="approved"){
    //             setIsApproved(false)
    //         }else{
    //             setIsAvailable(false)
    //         }
    //     }
    //     else{
    //         if(e.target.name==="approved"){
    //             setIsApproved(true)
    //         }else{
    //             setIsAvailable(true)
    //         }
    //     }
    // };

{/* <div className="col-10 offset-3 row">
                
            </div> */}
            // <div className="col-10 offset-3 row">
            //     {/* <div className="col-3">
            //         <input className="form-check-input me-1" type="checkbox" name="approved" value={isApproved} id="approved" onChange={onCheckboxChange} aria-label="..."/>
            //             Approve
            //     </div>
            //     <div className="col-5">
            //         <input className="form-check-input me-1" type="checkbox" name="available" value={isAvailable} id="available"  onChange={onCheckboxChange} aria-label="..."/>
            //             Make Available to customers
            //     </div> */}
            //     <div className="col-3">
            //     <input className="form-check-input" type="checkbox" value={approved} id="approved"
            //         onChange={onInputChange} />
            //         <label className="form-check-label" htmlFor="approved">
            //            approved
            //         </label>
            //     </div>
            //     <div className="col-3">    
            //         <input className="form-check-input" type="checkbox" value={available} id="available"
            //         onChange={onInputChange} />
            //         <label className="form-check-label" htmlFor="available">
            //         available
            //         </label>
            //     </div>


//    private String productName;
// productName, available,approved,minBuyQty,discount,originPlace,purchasePrice
	
	// private boolean available; //will be done by store admin
	
	// private boolean approved; //will be done by admin
	
	// @NotNull(message="default quantity must be provided")
	// private int minBuyQty; //qty to show next to the image on UI page by default at start so user can either buy that much quantity 
	// //or further/more than it and this will be set by the admin/store admin looking at the duration of its freshness
	
	// @Max(value=80)
	// private int discount; //will be set by admin whenever he/she wants
	
	// private String originPlace;//will be set by store admin
	
	// @NotNull(message="purchase price must be provided")
	// private double purchasePrice;


    // <form onSubmit={handleSubmit}>
    //              <div classNameName="col-3 offset-4">
    //                <select classNameName="form-select" aria-label="Default select example" onChange={(e)=>setRole(e.target.value)}>
    //                  <option value="ROLE_CUSTOMER">CUSTOMER</option>
    //                  <option value="ROLE_FARMER">FARMER</option>
    //                 <option value="ROLE_ADMIN">ADMIN</option>
    //                </select>
    //             </div>
    //              <div classNameName="col-3 offset-4">
    //                <label ref={startRef} htmlFor="fname"  classNameName="form-label label">First name</label>
    //                <input type="text" placeholder='Enter first name' classNameName="form-control" id="fname"
    //                     value={fname} required onChange={(e)=>setFname(e.target.value)} />
    //             </div>
    //             <div classNameName="col-3 offset-4">
    //               <label htmlFor="lname" classNameName="form-label label">Last name</label>
    //               <input type="text" placeholder='Enter last name' classNameName="form-control" id="lname" 
    //                     value={lname} required onChange={(e)=>setLname(e.target.value)}/>
    //             </div>
    //             <div classNameName="col-3 offset-4">
    //             <label htmlFor="email" classNameName="form-label label">Email</label>
    //               <input type="text" placeholder='Enter Email-ID' classNameName="form-control" id="email" 
    //                     value={email} required onChange={(e)=>setEmail(e.target.value)} 
    //                     onFocus={()=>setEmailFocus(true)} onBlur={()=>setEmailFocus(false)}/>
    //               <p classNameName={emailFocus&&!validEmail?"instructions":"offscreen"}>email must be valid and unique</p>
    //               <p classNameName={!emailFocus&&!validEmail&&email?"error":"offscreen"}>invalid email</p>
    //             </div>
    //             <div classNameName="col-3 offset-4">
    //             <label htmlFor="password" classNameName="form-label label">Password</label>
    //               <input type="password" placeholder='Enter password' classNameName="form-control" id="password" 
    //                     value={password} required onChange={(e)=>setPassword(e.target.value)}
    //                     onFocus={()=>setPwdFocus(true)} onBlur={()=>setPwdFocus(false)}/>
    //               <p classNameName={pwdFocus&&!validPwd?"instructions":"offscreen"}>
    //               Must include uppercase and lowercase letters,<br/> a number and a special character.</p>
    //               <p classNameName={!pwdFocus&&!validPwd&&password?"error":"offscreen"}>invalid password</p>
    //             </div>
    //             <div classNameName="col-3 offset-4">
    //             <label htmlFor="confirmPassword" classNameName="form-label label">Confirm Password</label>
    //               <input type="password" placeholder='Enter password' classNameName="form-control" id="confirmPassword" 
    //                     value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)}/>
    //               <span classNameName={matchPwd?"offscreen":"pwd"}>Password is not matching</span>
    //             </div>
    //             <div>
    //               <p ref={errorRef} classNameName={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
    //             </div>
    //             <div classNameName="col-4 offset-5">
    //               <button disabled={fname==='' || lname==='' || email==='' || password==='' || !matchPwd ?true:false}
    //                       classNameName="btn btn-lg btn-primary submit" type="submit">Submit</button>
    //             </div>
    //           </form>
    