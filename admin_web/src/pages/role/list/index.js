import React, { useState } from 'react';
import {theme} from 'antd'
const RoleManagement = () => {
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
   Role LIST
  </div>
  );
};

export default RoleManagement;