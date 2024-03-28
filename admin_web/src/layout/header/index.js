import React, { Component, useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Space,Avatar } from 'antd'
import constUrl from '../../api/constUrl';
import "./style/index.css"


const Header = ()=>{
    const imageUrl = `${constUrl.baseURL}${constUrl.avatarInfo}${localStorage.getItem("imageurl")}`

        

    
        return (
            <div className='m-header'>
                <Space>
                <Avatar shape="square" size="large" icon={<UserOutlined />} src={imageUrl} />
                    <span>Hi, {localStorage.getItem("userName")}</span>
                    <a>Log Out</a>
                </Space>
            </div>
        )
}
export default Header