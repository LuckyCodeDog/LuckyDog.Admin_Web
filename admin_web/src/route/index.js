import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Image} from 'antd'
import Login from '../pages/login/Login';
import Main from '../pages/main';
import ProtectedRoute from './protect/ProtectedRoute ';
import MenuManagement from '../pages/menu/list';
import RoleManagement from '../pages/role/list';
import UserManagement from '../pages/user/list';
import WelcomeImg from "../assets/img/welcome.gif"
const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  if (token != null && token.length > 0) {
    return true
  } else {
    console.log(token)
    return false
  }
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated()} children={<Main></Main>} />}>
          <Route  path="/" element={<Image src={WelcomeImg} width={"100%"}  preview={false}></Image>}> /</Route>
          <Route path="user" element={<UserManagement />} />
          <Route path="role" element={<RoleManagement />} />
          <Route path="menu" element={<MenuManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

