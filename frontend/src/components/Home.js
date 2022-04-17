import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
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
      const user=JSON.parse(localStorage.getItem("userDetails"));
      
      useEffect(()=>{
          fetchProducts();
      },[])

      const fetchProducts = async()=>{
        try{
            const response=await axios.get('/customer/allProducts',{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                });
                if(response && response?.data)
                {
                    setProducts(response.data)
                }
        }catch(err){
            alert(err.response.data.message)
        }
    }
    const addToCart=(e)=>{
        const tempId=e.target.id;
        let tempProduct={}
        tempProduct=products.find((p)=>p.id==parseInt(tempId))
        let tempObj={pId:parseInt(tempId),pName:tempProduct.productName,qty:1,image:tempProduct.img}
            if(user==null)
            {
                history.push('/login')
            }
            else{
                let cart=JSON.parse(localStorage.getItem("cart"))
                if(cart.length==0)
                {
                    localStorage.setItem("cart",JSON.stringify([tempObj]))
                    alert("added to cart")
                }
                else{
                    let result={}
                    result=cart.find((c)=>c.pId==tempId)
                    if(result==null || result=='')
                    {
                    cart.push(tempObj)
                    localStorage.setItem("cart",JSON.stringify(cart))
                    alert("added to cart")
                    }else{
                    alert("already added to cart")
                }
                    
                }
            }
    }


    return(
        <>
            {products.length?(
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
