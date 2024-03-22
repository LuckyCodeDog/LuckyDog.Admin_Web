import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
  FileOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import { Button, Menu  } from 'antd';

function getItem(label, key, icon, to, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={to}>{label}</Link>
  };
}
const items = [
  getItem('UserManagement', '1', <UserOutlined />, '/user'),
  getItem('RoleManagement', '2', <TeamOutlined />,'/role'),
  getItem('MenuManagement', '3', <FileOutlined />,'menu'),
];
const Slider = () => {

  return (
    <div>

      <Menu 
      theme="dark" 
      defaultSelectedKeys={['1']} 
      mode="inline" 
      items={items} 
      />

    </div>
  );
};
export default Slider;