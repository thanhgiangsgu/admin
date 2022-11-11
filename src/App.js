import { Routes, Route, Router,withRouter }  from 'react-router-dom'
import * as React from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter } from 'react-router-dom'
import Templates from './pages/Templates'
import Login from './LoginForm/Login'
import SignUp from './LoginForm/Signup'
import { Toaster } from 'react-hot-toast'
import Overview from './pages/OverView';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Report from './pages/Report';
import Account from './pages/Account';
import Category from './pages/Category';
import BuyOrder from './pages/BuyOrder'


function App() {
  const check = false;
  return (
   
    <BrowserRouter>
      <Routes>
        
        <Route path="admin" element={<Templates />}>
          <Route path="overview" element={<Overview/> }  />
          <Route path="customers" element={<Customers/>} />
          <Route path="products" element={<Products/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="report" element={<Report/>} />
          <Route path="account" element={<Account/>} />
          <Route path="category" element={<Category/>} />
          <Route path="buyorder" element={<BuyOrder/>} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  
         
    
  ); 
}

export default (App);
