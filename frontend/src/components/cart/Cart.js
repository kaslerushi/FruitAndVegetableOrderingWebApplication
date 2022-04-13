import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import '../../css/cart.css';
import axios from "../../api/axios";


const Cart=()=>{
    const [cartItems, setCartItems] = useState({
            pId:1,
            pName:"",
            qty:1,
            image:""
          });
       
    const [products, setProducts] = useState({
        id:0,
        productName: "",
        pricePerUnitQty: 0,
        qtyRemaining: 0,
        discount:0,
        available:false,
        category:{defaultUnit:""},
        avgRating:0,
        purchasePriceOnUnitQty:0,
    });
       
    const [totalPrice, setTotalPrice] = useState();
      
    const user=JSON.parse(localStorage.getItem("userDetails"));
    let totalObj={};
    let total=0;
    useEffect(()=>{
        fetchCartItemsAtStart();
        fetchProducts();
        console.log("in useeffect of products changing")
        const t1=JSON.parse(localStorage.getItem("totalAmount"))
        console.log(t1)
        if(t1==null)
        {
           localStorage.setItem("totalAmount",JSON.stringify({total:0}))
        }else{
            // tempResult=JSON.parse(localStorage.getItem("totalAmount"))
            // console.log(tempResult)
            // console.log(tempResult.total)
            setTotalPrice(t1.total)
        }
    },[])

    useEffect(()=>{
        setTotalPrice(total)
        let tempResult={total:total}
        console.log(total)
        console.log(tempResult)
        localStorage.setItem("totalAmount",JSON.stringify(tempResult))
        
    },[cartItems])
    
    const removeCartItem=(e)=>{
        const tempId=parseInt(e.target.id);
        console.log("in delete method")
        const tempCartItems=cartItems.filter((c)=>c.pId!=tempId)
        console.log(tempCartItems)
        localStorage.setItem("cart",JSON.stringify(tempCartItems))
        setCartItems(tempCartItems)
    }
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
                    console.log(response)
                    if(response && response?.data)
                    {
                        console.log("in products got all products")
                        console.log(response)
                        console.log(response.data)
                        setProducts((await response.data))
                        console.log(products.data)
                        console.log(cartItems)
                    }
            }catch(err){
                console.log("in error")
            }
        }

    const fetchCartItemsAtStart=()=>{
        console.log('in fetch cartItems')
            let cart=(localStorage.getItem("cart"));
            if(cart!=null)
            {
             setCartItems(JSON.parse(cart));   
            }
            console.log(cartItems)
    }

const addQuantity=(e)=>{
    console.log(cartItems)
    const tempqty=parseInt(e.target.id);
    console.log(tempqty)
    cartItems.filter((p)=>p.pId==tempqty)
        .map(filteredProduct=>(filteredProduct.qty=filteredProduct.qty+1))
    localStorage.setItem("cart",JSON.stringify(cartItems))
    console.log(cartItems)
    setCartItems(JSON.parse(localStorage.getItem("cart")))
    console.log(cartItems)
}

const reduceQuantity=(e)=>{
    console.log(cartItems)
    const tempqty=parseInt(e.target.id);
    console.log(tempqty)
    cartItems.filter((p)=>p.pId===tempqty)
    .map(filteredProduct=>(filteredProduct.qty==1?filteredProduct.qty=1:filteredProduct.qty=filteredProduct.qty-1))
    localStorage.setItem("cart",JSON.stringify(cartItems))
    console.log(cartItems)
    setCartItems(JSON.parse(localStorage.getItem("cart")))
    console.log(cartItems)
}


    return(
        <>
            {cartItems.length && products.length?(
    <section className="mt-5">
        <div className="container">
            <div className="cart">
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col"className="">Product</th>
                            <th scope="col"className="">Product Name</th>
                            <th scope="col"className="">Price</th>
                            <th scope="col"className="">Quantity</th>
                            <th scope="col"className="">Total</th>
                            <th scope="col"className="">Operation</th>
                        </tr>
                    </thead>
                    <tbody >
                    {cartItems.map((c,index)=>(
                        <tr key={index} className="shadow p-3 mb-5 bg-body rounded">
                            <td>
                                <div className="main">
                                    <div className="d-flex">
                                        <img src={c.image} alt="image not found"/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="" style={{maxBlockSize:"200px"}}>
                                        <p>{c.pName}</p>
                                </div>
                            </td>
                            <td>
                                {products.filter((p)=>p.id===c.pId)
                                .map(filteredProduct=>(<h6 key={filteredProduct.id}>{filteredProduct.pricePerUnitQty}</h6>))
                                }
                            </td>
                            <td>
                                                    {/* setProduct({ ...product, [e.target.name]: e.target.value }); */}
                                <div className="counter btn-group">
                                    <button className="btn btn-dark" id={c.pId} type="button" onClick={reduceQuantity}>-</button>
                                    <input  className="input-number" id={c.pId} type="text" value={cartItems.filter((p)=>p.pId===(c.pId))                    
                                .map(filteredProduct=>filteredProduct.qty)
                                }  min="0" readOnly/>
                                    <button className="btn btn-dark" id={c.pId} type="button" onClick={addQuantity}>+</button>
                                </div>
                            </td>
                            <td>
                            {products.filter((p)=>p.id===c.pId) 
                                .map(filteredProduct=>(<h6 key={filteredProduct.id}>{filteredProduct.pricePerUnitQty*c.qty}</h6>))
                                }
                            </td>
                            <td>
                                <button className="" type="button" id={c.pId} onClick={(e)=>removeCartItem(e)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    
                    {cartItems.forEach(c =>
                    products.filter((p)=>p.id==c.pId).forEach(result=>total+=result.pricePerUnitQty*c.qty))
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h4>TOTAL</h4></td>
                        <td>
                        <h4>{totalPrice}</h4>
                        </td>
                    </tr>
                    </tbody> 
                </table>
            </div>
            </div>
        </div>
    </section>

            ):(
                <h1>No Items In the cart</h1>
            )}
        </>
    );
}      

export default Cart;

