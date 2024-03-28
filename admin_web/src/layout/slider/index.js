import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, } from 'react-router-dom';
import {   message } from 'antd'
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
import service from '../../api/service';
import constUrl from '../../api/constUrl';
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
  const [menus,setMenus] =useState([])

  useEffect(()=>{
      service.get(`${constUrl.baseURL}${constUrl.menuInfo}`).then(res=>{
          let {message:msg,data,ovalue,success} = res
          if(success){
            console.log(data)
              setMenus(data)                 
          }else{
              message.error(msg)
          }
      }).catch(err=>{
         message.error(err)
      })
  },[]) 
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