import React, { Component } from 'react'
import { Space } from 'antd'
import "./style/index.css"


const Header = ()=>{
        return (
            <div className='m-header'>
                <Space>
                    <span>hi, username</span>
                    <a>退出登录</a>
                </Space>
            </div>
        )
}
export default Header