import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch, Row, Col, Select, Upload, message, Checkbox, Space,Divider } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const AssignRolesModal = ({ isModalOpen, currentMenuId, currentMenuType }) => {
    const [form] = Form.useForm();
    const [menuId, setmenuId] = useState(currentMenuId)
    const [menuType, setMenuType] = useState(currentMenuType)
    const [roles, setRoles] = useState([])

    const [rolesForApi, setRolesForApi] = useState({
        menuId,
        menuType,
        roleId: []
    })
    
    const addUser = (params) => {
        axios.post(`${routes.userInfo}`, params).then(res => {
            message.success(res.message)
        }).catch(err => {
            message.error(err)
        })
    }

    const  hadnleMenuRoles = (roles )=>{
        let  rolesIdsForApi =  roles.filter(r=>r.selected == true).map(r=>r.roleId)
        axios.put(`${routes.Menus_URL}`,{menuId ,menuType,roleId:rolesIdsForApi}).then(res=>{
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
    // add menuType Params
    useEffect(() => {
        axios.get(`${routes.Menus_URL}${routes.VIEW_ROLES_URL}/${menuId}/${menuType}`).then(res => {
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
                
                hadnleMenuRoles(roles)
            })
            .catch((info) => {
                message.error(info)
            });
    };

    const handleCancel = () => {
        isModalOpen(false)
    };

    const  handleRoleSelect = (roleId, checked)=>{
        setRoles(preRoles =>  preRoles.map(r=> r.roleId ===roleId? {...r,selected:checked }:r))
        let  rolesIdsForApi =    roles.filter(r=>r.selected == true).map(r=>r.roleId)
    
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
                    <Row gutter={[8, 8]} wrap={true} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {roles.map((r) => (
                            <Col key={r.role_id} span={8}>
                                <Checkbox  checked={r.selected}   onChange={(e)=>{handleRoleSelect(r.roleId, e.target.checked)}}>{r.roleName}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AssignRolesModal;
