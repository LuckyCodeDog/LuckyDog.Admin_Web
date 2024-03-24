import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch, Row, Col, Select, Upload, message, Checkbox, Space,Divider } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const AssignRolesModal = ({ isModalOpen, currentUserId }) => {
    const [form] = Form.useForm();
    const [userId, setUserId] = useState(currentUserId)
    const [roles, setRoles] = useState([])
    const addUser = (params) => {
        axios.post(`${routes.baseURL}${routes.userInfo}`, params).then(res => {
            message.success(res.message)
        }).catch(err => {
            console.log(err)
        })
    }

    const  hadnleUserRoles = (roles )=>{
        axios.post(routes.HANDLE_ROLES_URL,roles).then(res=>{
            var {message:msg, success} = res
            if( success ){
                message.success(msg)
            }else{
                message.error(msg)
            }
        }).catch(err=>{
            message.err(err)
        })

    }
    useEffect(() => {
        axios.get(`${routes.userInfo}/${userId}`).then(res => {
            let { message: msg, data, success } = res
            if (success) {
                setRoles(data)
            } else {
                message.error(msg)
            }
        }).catch(err => {
            message.error(err)
        })
    },[])
    const handleOk = () => {
        form
            .validateFields()
            .then(() => {
                hadnleUserRoles(roles)
            })
            .catch((info) => {
                message.error(info)
            });
    };

    const handleCancel = () => {
        console.log(currentUserId)
        isModalOpen(false)
    };

    const handleRoleSelect = (role_id, checked)=>{
       setRoles(preRoles =>  preRoles.map(r=> r.role_id ===role_id? {...r,selected:checked }:r))
    }


    return (
        <>
            <Modal
                title="Assign Roles User"
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Divider></Divider>
                <Form
                    form={form}
                    layout="horizontal"
                    name="userInfoForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                >
                    {/* 使用Row作为flex容器，使得Col内的Checkbox可以横向排列并自动换行 */}
                    <Row gutter={[8, 8]} wrap={true} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {roles.map((r) => (
                            <Col key={r.role_id} span={8}>
                                <Checkbox  checked={r.selected}   onChange={(e)=>{handleRoleSelect(r.role_id,e.target.checked)}}>{r.role_name}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AssignRolesModal;
