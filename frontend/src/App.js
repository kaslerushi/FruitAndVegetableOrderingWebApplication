import React, { useLayoutEffect } from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import AdminHome from './components/AdminHome'
import FarmerHome from './components/FarmerHome'
import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'


import { useContext } from "react";
import AuthContext from "./context/AuthProvider";
import CategoryList from "./components/categories/CategoryList"
import AddCategory from "./components/categories/AddCategory"
import AddProduct from "./components/products/AddProduct"
import ProductList from "./components/products/ProductList"
import ApproveProduct from "./components/products/ApproveProduct"
import Navbar from "./components/header/Navbar"
import ViewProduct from "./components/products/ViewProduct"
import Cart from "./components/cart/Cart"

function App() {
  const {setLoggedIn,setStartVisit,setRole} =useContext(AuthContext)

  useLayoutEffect(()=>{
    if(localStorage.getItem("userDetails")!==null)
    {
      const userInfo=JSON.parse(localStorage.getItem("userDetails"));
      if(userInfo){
      setLoggedIn(true);
      setStartVisit(true);
      setRole(userInfo.role)
      }
    }
    },[]);
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/'  component={Home}/>
          <Route path='/AdminHome' component={AdminHome}/>
          <Route path='/FarmerHome' component={FarmerHome}/>
          <Route exact path='/cart' component={Cart}/>
          <Route path='/categoryList' component={CategoryList}/>
          <Route exact path='/addCategory' component={AddCategory}/>
          <Route exact path='/productList' component={ProductList}/>
          <Route exact path='/productList/addProduct' component={AddProduct}/>
          <Route exact path='/productList/approveProduct/:id' component={ApproveProduct}/>
          <Route exact path='/productList/viewProduct/:id' component={ViewProduct}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
