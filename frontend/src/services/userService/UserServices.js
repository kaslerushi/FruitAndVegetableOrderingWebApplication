// import React from "react";
// import axios from "axios";

// const base_url="http://localhost:9090/"

// const UserServices=()=>{
//     getUsers=()=>{
//         return axios.get(base_url+"users")
//     }
    
//     addUser=(user)=>{
//         return axios.post(base_url+"register",user,{
//             headers:{
//                 'Content-Type':'application/json'
//             }
//         });
//     }

//     validateUser=(user)=>{
//         return axios.post(base_url+"login",user,{
//             headers:{
//                 'Content-Type':'application/json'
//             }
//         });   
//     }
// }

// export default UserServices;

























// import React from "react";
// import axios from "axios";
// const base_url="http://localhost:3306/";
// // const register = () => {
// //     Axios.post("http://localhost:3001/register", {
// //       username: usernameReg,
// //       password: passwordReg,
// //     }).then((response) => {
// //       console.log(response);
// //     });
// //   };
        
//             export const GetUserList=()=>{
//                 return (
//                     axios.get(base_url+"users")
//                     );
//             }

//             export const AddUser=(fname,lname,email,mobNo,pwd)=>{
//                 console.log(fname,lname,email,mobNo,pwd)
//                 return axios.post(base_url+"register",{fname,lname,email,mobNo,pwd},{
//                         headers:{
//                             'Content-Type':'application/json'
//                         }
//                     });
//             }
//             export const AuthenticateUser=(id)=>{
//                 return axios.get(base_url+"users/"+id)
//             }
//             export const deleteEmployee=(userid)=>{
//                 return axios.delete(base_url+"users/"+userid);
//             }
        
