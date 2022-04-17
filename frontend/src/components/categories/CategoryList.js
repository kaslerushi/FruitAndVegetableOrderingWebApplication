import React, { useState,useEffect,useRef } from "react";
import { Link} from "react-router-dom";
import axios from "../../api/axios";
import Category from "./Category";


const CategoryList=()=>{
    const [categories, setCategories] = useState([]);
    const errorRef= useRef('');
    const messageRef= useRef('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [deleted, setDeleted] = useState('');
    const user=JSON.parse(localStorage.getItem("userDetails"));
    

    useEffect(()=>{
            setDeleted("")
            fetchCategories()
        },[deleted])
    

    const deleteCategory=(eventId)=>{
        setMessage('') 
        setError('')
            axios.delete(`/admin/categories/delete/${eventId}`,{
                auth: {
                    username:user.email,
                    password:user.password
                  }
              
                }).then((response)=>{
                    setDeleted("deleted");
                    const categorylist=categories.filter(category=>((category.id)!==eventId))
                    setCategories(categorylist)
                }).catch((err)=>{alert(err.response.data.message)})
            }
               

    const fetchCategories = ()=>{
        setError('');
             axios.get('/farmer/categories',{
                auth: {
                    username:user.email,
                    password:user.password
                  }
                }).then((response)=>{
                   setCategories(response.data)
                }).catch((err)=>{alert(err.response.data.message)})
    }

    return(
        <>
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