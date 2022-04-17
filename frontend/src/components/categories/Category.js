import React from "react";


const Category=({category,deleteCategory})=>{
    console.log("in single category ")
    console.log(category)
    return(
        <>
            <tr key={category.id}>
                <td>{category.mainCategory}</td>
                <td>{category.subCategory}</td>
                <td>{category.variety}</td>
                <td><button type="button" className="btn btn-danger" id={category.id} onClick={(e)=>deleteCategory(e.target.id)}>Delete</button></td>
            </tr>
        </>
        
    );
}
                                                
export default Category;