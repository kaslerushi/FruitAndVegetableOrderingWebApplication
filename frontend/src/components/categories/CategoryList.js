import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Navbar from "../header/Navbar";
import { useContext } from "react";

// import AuthContext from "../context/AuthProvider";
import axios from "../../api/axios";
import Category from "./Category";


const CategoryList=()=>{
    console.log("in categories")
    const history=useHistory(); 
    const [categories, setCategories] = useState([]);
    const errorRef= useRef('');
    const messageRef= useRef('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [deleted, setDeleted] = useState('');
    const user=JSON.parse(localStorage.getItem("userDetails"));
    // useLayoutEffect(()=>{
    //     fetchCategories();
    //     console.log("in useeffectlayout of categories changing")
    // },[])

    useEffect(()=>{
        console.log("inside useeffect")
            setDeleted("")
            fetchCategories()
        },[deleted])
    

    const deleteCategory=(eventId)=>{
        setMessage('') 
        setError('')
        // const eventId=e.target.id;
        // const url=`/admin/categories/delete/${id}`;
        // console.log(`/admin/categories/delete/${eventId}`)
        // console.log(e.target.id)
        // try{
            axios.delete(`/admin/categories/delete/${eventId}`,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
              
                }).then((response)=>{
                    setDeleted("deleted");
                    console.log("in response")
                    const categorylist=categories.filter(category=>((category.id)!==eventId))
                    setCategories(categorylist)
                }).catch((err)=>{alert(err.response.data.message)})
                // if(response && response?.data)
                // {
                    
                // }
        // }catch(err){
        //     setError(err);
        // }
    }
        // console.log("redirecting")
        // history.push('/admin/categories/${id}');
        // console.log("redireced")
        // <Redirect to='/admin/categories/${id}'/>
        
    
    // const showCategoryDetails=()=>{
    //     setError('')
    //     try{
             
    //     }catch(err){
    //         setError(err);
    //     }
    // }


    // const =(e)=>{
    //     setMessage('') 
    //     setError('')
    //     const user=JSON.parse(localStorage.getItem("userDetails"));
    //     const id=e.target.id;
    //     const categoryInfo={id,mainCategory,subCategory,variety,defaultUnit,miniSellQty,minSellPrice}
    //     try{
    //         const response=axios.post('/admin/editCategory',{categoryInfo},{
    //             auth: {
    //                 username:user.email,
    //                 password:user.password
    //               }
            
    //             });
    //             if(response && response?.data)
    //             {
    //                setMessage(response.data) 
    //             }
    //     }catch(err){
    //         setError(err);
    //     }
    // }

    const fetchCategories = ()=>{
        setError('');
        console.log("in categories fetching")
        
        // try{
             axios.get('/farmer/categories',{
                auth: {
                    username:user.email,
                    password:user.password
                  }
            
                }).then((response)=>{
                    console.log("in categories got all categories")
                    console.log(response)
                    console.log(response.data)
                   setCategories(response.data)
                }).catch((err)=>{alert(err.response.data.message)})
        //         if(response && response?.data)
        //         {
                    
        //         }
        // }catch(err){
        //     setError(err);
        // }
    }

    return(
        <>
        
            {/* <button type="button" onClick={fetchCategories}>Get List Of Categories</button> */}
            <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
            <p ref={messageRef} className={message?"":"offscreen"}> {message} </p>
          <button><Link className="nav nav-item nav-link" to="/addCategory">add Category</Link></button>  
            {categories.length?(
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <td>Main Category</td>
                            <td>Sub Category</td>
                            <td>Variety</td>
                            <td>operation1</td>
                            {/* <td>operation2</td> */}
                        </tr>
                    </thead>
                    <tbody>
                    {categories.map((category)=>(
                    <Category key={category.id} category={category} deleteCategory={deleteCategory}/>
                    ))}
                    </tbody>
                </table>
            ):(
                <h1>In categories page</h1>
            )}
        </>
    );
}
                                                
export default CategoryList;