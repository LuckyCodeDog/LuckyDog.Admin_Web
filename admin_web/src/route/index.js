import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main';
import MenuManagement from '../pages/menu/list';
import RoleManagement from '../pages/role/list';
import UserManagement from '../pages/user/list';
import Abc from '../components/Abc';
const routes=() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="user" element={<UserManagement />} /> 
          <Route path="role" element={<RoleManagement />} /> 
          <Route path="menu" element={<MenuManagement/>} />
          <Route path="ABC" element={<Abc/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
