import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, } from 'react-router-dom';
import {   message } from 'antd'
import * as Icon from '@ant-design/icons';
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

const getMenus =(data)=>{
   return data.filter(d => d.menuText !== "File Management").map(d => ({
    label: <Link to={d.webUrl}>{d.menuText}</Link>,
    key: d.id,
   icon:  d.icon==null||undefined? null: React.createElement(Icon[d.icon]),
    children: d.children.length == 0? null: getMenus(d.children)
}));
}

const Slider = () => {
  const [menus,setMenus] =useState([])
  const queryMenu= ()=>{
    service.get(`${constUrl.baseURL}${constUrl.menuInfo}`).then(res=>{
      let {message:msg,data,ovalue,success} = res
      if(success){
        const mappedData = data== undefined || null ? []: getMenus(data)
          setMenus(mappedData)                 
      }else{
          message.error(msg)
      }
  }).catch(err=>{
     message.error(err)
  })
  }
  useEffect(()=>{
      queryMenu()
  },[]) 
  return (
    <div>

      <Menu 
      theme="dark" 
      defaultSelectedKeys={['1']} 
      mode="inline" 
      items={menus} 
      />

    </div>
  );
};
export default Slider;