import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import constUrl from '../../api/constUrl';
import service from '../../api/service';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let navigate = useNavigate();
    const onFinish = (values) => {
        console.log(values)
        service.post(`${constUrl.LOGIN_URL} `, values).then(res=>{
            let {message:msg, oValue, success , data} =res
            if(success){
                console.log(data)
                console.log(message)
                localStorage.setItem("token",oValue.accesstoken)
                localStorage.setItem("userId",data.userId)
                localStorage.setItem("userName",data.userName)
                localStorage.setItem("imageurl",data.imageurl)
                navigate("/")
            }else{
                message.error(msg)
            }
        }).catch(err=>{
            message.error(err)
        })
    }
    return (
        <div style={{ background: 'rgb(35, 39, 65)', height: "100%",overflow:'hidden' }}>

            <div className="formContainer">
                <div className="logintitle">LuckDog Admin</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                     </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
