import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, message, Divider, Input, Switch } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const AddRoleModal = ({ isModalOpen, currentRoleId,refreshPage }) => {
    const [form] = Form.useForm()
    const [roleId, setroleId] = useState(currentRoleId)
    const [menus, setmenus] = useState([])
    const [checkedKeys, setCheckedKeys] = useState([])
    const [checkedForApi, setCheckedForApi] = useState([])
    // Lst<string> menuIds, roleId 
    const addRole = (params) => {
        axios.post(`${routes.baseURL}${routes.userInfo}`, params).then(res => {
            message.success(res.message)
        }).catch(err => {
            console.log(err)
        })
    }

    const onFormFinish = async () => {
        try {
            // 手动触发表单校验
            const values = await form.validateFields();
            
            values.status =  values.status == true? 0 : 1
            console.log('Success:', values);
            axios.post(`${routes.ROLE_URL}`,values).then(res=>{
                let {message:msg,success} = res
                if(success){
                    message.success(msg)
                    isModalOpen(false)
            
               }else{
                    message.error(msg)
               }
            }).catch(err=>{
                message.err(err)
            })

        } catch (errorInfo) {    
        }
    }
    const handleCancel = () => {
        console.log(currentRoleId)
        isModalOpen(false)
    };



    return (
        <>
            <Modal
                title="Add Role"
                open={true}
                onCancel={handleCancel}
                onOk={onFormFinish}
            >
                <Divider></Divider>
                <Form
                    form={form}
                    layout="horizontal"
                    name="userInfoForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}

                >
                    <Form.Item
                        name="roleName"
                        label="Role Name:"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item label="Status" name="status" valuePropName="active" initialValue={true}>
                        <Switch checkedChildren="Active"
                            unCheckedChildren="Frozen"
                            defaultChecked tabIndex={1} size='middle' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddRoleModal;
