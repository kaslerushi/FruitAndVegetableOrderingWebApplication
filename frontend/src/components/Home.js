import React, { useState,useEffect, useLayoutEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "../api/axios";

const Home=()=>{
    const history=useHistory();
    const [products, setProducts] = useState({
        id:0,
        productName: "",
        pricePerUnitQty: 0,
        qtyRemaining: 0,
        discount:0,
        minBuyQty:0,
        available:false,
        category:{defaultUnit:""},
        defaultUnit:"",
        img:"",
        avgRating:0
      });
    //   const [quantities, setQuantities] = useState({
    //     id:0
    //   });
    let cartItems=[]
    // const [qty,setQty]=useState(1)
    const [quantities,setQuantities]=useState([])
      const user=JSON.parse(localStorage.getItem("userDetails"));
      
      useEffect(()=>{
          fetchProducts();
          console.log("in useeffect of products changing")
      },[])

      const fetchProducts = async()=>{
        // setError('');
        console.log("in products fetching")
        try{
            const response=await axios.get('/customer/allProducts',{
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
                    setProducts(response.data)
                }
        }catch(err){
            alert(err.response.data.message)
            console.log("in error")
        }
    }
    const addToCart=(e)=>{
        const tempId=e.target.id;
        console.log(products)
        let tempProduct={}
        tempProduct=products.find((p)=>p.id==parseInt(tempId))
        console.log(tempProduct)
        let tempObj={pId:parseInt(tempId),pName:tempProduct.productName,qty:1,image:tempProduct.img}
        console.log(tempId,tempObj,tempProduct)
            if(user==null)
            {
                console.log(user)
                history.push('/login')
            }
            else{
                let cart=JSON.parse(localStorage.getItem("cart"))
                console.log(cart.length)
                // alert(cart.length)
                if(cart.length==0)
                {
                    localStorage.setItem("cart",JSON.stringify([tempObj]))
                    alert("added to cart")
                }
                else{
                    console.log(cart)
                    let result={}
                    result=cart.find((c)=>c.pId==tempId)
                    console.log(result)
                    if(result==null || result=='')
                    {
                    cart.push(tempObj)
                    localStorage.setItem("cart",JSON.stringify(cart))
                    alert("added to cart")
                    console.log(cart)
                    }else{
                    alert("already added to cart")
                }
                    
                }
            }
    }

const handleQty=(e)=>{
    const tempId=e.target.id
    const tempQty=e.target.value
    let cart=localStorage.getItem("cart")
    if(user==null)
    {
        history.push('/login')
    }
    else{
        if(cart==null)
        {
            let cartItem={pId:0,pName:"",qty:0}
            localStorage.setItem("cart",JSON.stringify([cartItem]))
        }
        else{
            let cartItems=JSON.parse(cart)
            cartItems.map((c)=>c.pId==tempId?(c.qty=tempQty):null)
            console.log(cartItems)
            console.log(tempId,tempQty)
        }
    }
}
// const onInputChange = e => {
//     //     setUser({ ...user, [e.target.name]: e.target.value });
//     //   };
// .mt-0 {
//     margin-top: 0 !important;
//   }
  
//   .ms-1 {
//     margin-left: ($spacer * .25) !important;
//   }
  
//   .px-2 {
//     padding-left: ($spacer * .5) !important;
//     padding-right: ($spacer * .5) !important;
//   }

    return(
        <>
            {products.length?(
                // <div class="d-flex bd-highlight">
                //     <div class="p-2 w-100 bd-highlight">Flex item</div>
                //     <div class="p-2 flex-shrink-1 bd-highlight">Flex item</div>
                // </div>
                // <p class="text-decoration-line-through">This text has a line going through it.</p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            
                    {products.map((product,index)=>(product.available?(
                        <div key={index} className=" col">
                            <div  className="shadow  card h-100">
                                <img src={product.img} style={{width:'200px'}} className="card-img-top" alt="Img Not Found"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.productName}</h5>
                                </div>
                                <div>
                                    <input readOnly value={`${product.pricePerUnitQty} RS / ${product.category.defaultUnit}`} className="col-4 offset-2" type="text"/>
                                </div>
                                
                                {/* <div>
                                    <label className="col-2" >TOTAL</label>
                                    <input className="col-3"  value={product.pricePerUnitQty*qty} type="number"/>
                                    <label className="col-1" >Qty</label>
                                    <input className="col-1" id={product.id} onChange={handleQty} value={quantities?quantities.filter((q)=>q==q.id):0} min='1' type="number"/>
                                </div> */}
                            {product.qtyRemaining>1?(
                                <button className="btn btn-dark" id={product.id} onClick={addToCart}>Add To Cart</button>
                            ):(
                                <button className="btn btn-warning">Out Of Stock</button>
                            )}
                            </div>
                        </div>):(
                            null
                        )
                        ))   
                    }
                    
              
            </div>
            ):null}
        </>
    );
}
                                                
export default Home;


// useLayoutEffect(()=>{
    //     console.log("loggedIn",loggedIn,"startVisit",startVisit,"role",role);
    //     console.log("first time for home page")
    //     if(loggedIn && startVisit){
    //         if(role==="ROLE_ADMIN")
    //         {
    //             // history.replace('/AdminHome')
    //             console.log("redirecting to admin home page");
    //             <Redirect to="/AdminHome" />
    //             console.log("redirected")
    //         }
    //         else{
    //             if(role==="ROLE_FARMER")
    //             {
    //                 history.replace('/FarmerHome')
    //             }
    //             else
    //             {
    //                 history.replace('/CustomerHome')
    //             }
    //         }
    //     }
    //   },[])