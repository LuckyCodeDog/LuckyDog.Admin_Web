import React,{useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Image} from 'antd'
import Login from '../pages/login/Login';
import Main from '../pages/main';
import ProtectedRoute from './protect/ProtectedRoute ';
import MenuManagement from '../pages/menu/list';
import RoleManagement from '../pages/role/list';
import UserManagement from '../pages/user/list';
import WelcomeImg from "../assets/img/welcome.gif"


const AppRoutes = () => {
  const [isAuthenticated ,setisAuthenticated] =useState(false)
  const toAuthenticated = () => {
    let isLogin = localStorage.getItem('isLogin');
    if(isLogin!="true"){
      return false
    }
    return true
  };

  useEffect(()=>{
    console.log("yanzheng",toAuthenticated())
     setisAuthenticated(toAuthenticated()) 
  },[] )
  const loginsuccess = (childrenState)=>{
     setisAuthenticated(childrenState)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login  loginsuccess={loginsuccess} />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} children={<Main></Main>} />}>
          <Route  path="home" element={<Image src={WelcomeImg} width={"100%"}  preview={false}></Image>}> /</Route>
          <Route path="user" element={<UserManagement />} />
          <Route path="role" element={<RoleManagement />} />
          <Route path="menu" element={<MenuManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

