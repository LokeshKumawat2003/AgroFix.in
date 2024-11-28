import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../Page/Cart'
import Nav from '../Components/Nav'
import ProductPage from '../Page/Product'
import Login from '../Page/Login'
import Signup from '../Page/Signup'
import ProductDetail from '../Page/ProductDetail'
import ProfilePage from '../Page/Profile'
import SearchResultPage from '../Components/Search'
import AdminPage from './../Page/Admin';
import PageRouts from './PageRouts'
import AdminData from '../Page/ProductDAta'
import OrderStatus from '../Page/OrderStatus'


const Allrouts = () => {
  return (
    <div>
        <Nav/> 
        {/* <SearchResultPage/> */}
      <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/productdatile' element={<ProductDetail/>}/>
        <Route path='/SignUp' element={<Signup/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/status' element={<OrderStatus/>}/>
       
        
      </Routes>
      <PageRouts/>
    
      
    </div>
  )
}

export default Allrouts
