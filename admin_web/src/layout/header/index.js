import React, { Component, useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Space,Avatar } from 'antd'
import constUrl from '../../api/constUrl';
import "./style/index.css"
import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    const imageUrl = `${constUrl.baseURL}${constUrl.avatarInfo}${localStorage.getItem("imageurl")}`
    let navigate = useNavigate();
        
    const LogOut =()=>{ 
        localStorage.clear()
        navigate("/login")

    }
    
        return (
            <div className='m-header'>
                <Space>
                <Avatar shape="square" size="large" icon={<UserOutlined />} src={imageUrl} />
                    <span>Hi, {localStorage.getItem("userName")}</span>
                    <a onClick={LogOut}>Log Out</a>
                </Space>
            </div>
        )
}
export default Header