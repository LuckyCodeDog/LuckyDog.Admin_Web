import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import constUrl from '../../api/constUrl';
import service from '../../api/service';
import { useNavigate } from 'react-router-dom';
export default function Login({loginsuccess}) {
    let navigate = useNavigate();
    const onFinish = (values) => {
        service.post(`${constUrl.LOGIN_URL} `, values).then(res=>{
            let {message:msg, oValue, success , data} =res
            if(success){
                localStorage.setItem("token",oValue.accesstoken)
                localStorage.setItem("userId",data.userId)
                localStorage.setItem("userName",data.userName)
                localStorage.setItem("imageurl",data.imageurl)
                localStorage.setItem("isLogin", "true")
                console.log(process.env.NODE_ENV);
                console.log("nav cur")
                loginsuccess(true)
                message.success("Login Successful, Welcome: "+process.env.BASE_URL)
                navigate("/home")
            }else{
                console.log("@@")
                console.log(process.env.BASE_URL)
                message.error(msg)
            }
        }).catch(err=>{
            console.log(process.env.BASE_URL)
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
