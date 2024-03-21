import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  ProfileOutlined,
  UserOutlined ,
  TeamOutlined,
  MailOutlined,
  BarsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu  } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('UserManagement', '1', <UserOutlined />),
  getItem('RoleManagement', '2', <TeamOutlined />),
  getItem('MenuManagement', '3', <ProfileOutlined />),

];
const Slider = () => {

  return (
    <div>

      <Menu  
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
};
export default Slider;