import React, { useState } from 'react';
import {theme} from 'antd'
const UserManagement = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div
    style={{
      padding: 24,
      minHeight: 360,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
  >
     User List
  </div>
  );
};

export default UserManagement;