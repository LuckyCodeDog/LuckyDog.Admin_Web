import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch, Row, Col, Select, Space, message, Dropdown, Pagination, Radio } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
import icons from '../../../components/icons'
import _ from "lodash"

const AddMenuForm = ({ isModalOpen }) => {
    const [form] = Form.useForm();
    const [allMenusInfo, setAllMenusInfo] = useState([])
    const [allIcons, setAllIcons] = useState(icons)
    const [currentIcons, setCurrentIcons] = useState(icons.slice(0, 10))
    const pageSize = 10; // Icons per "page"
    const [currentPage, setCurrentPage] = useState(1);

    let index = 0
    const getAllMenusInfo = () => {
        axios.get(`${routes.Menus_URL}/All`).then(res => {
            let { message: msg, data, success } = res
            if (success) {
                setAllMenusInfo(data)
            } else {
                message.error(msg)
            }
        }).catch(err => {
            message.error(err)
        })
    }
    useEffect(() => {
        getAllMenusInfo()
    }, [])

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                axios.post(`${routes.Menus_URL}`,values).then(res=>{
                    let {success,message:msg} = res
                    if(success){
                        message.info(msg)
                        isModalOpen(false)
                    }else{
                        message.error(msg)
                    }
                }).catch(err=>{
                    message.error(err)
                })
                
            })
            .catch((info) => {
            });
    };

    const handleCancel = () => {
        isModalOpen(false)
    };

   const onSctoll=(e)=>{
    const { target } = e;
    const atBottom = target.scrollTop + target.offsetHeight === target.scrollHeight;
  
    if (atBottom) {
      // Load more icons
      const nextPage = currentPage + 1;
      const nextIcons = allIcons.slice(0, nextPage * pageSize);
  
      setCurrentIcons(nextIcons);
      setCurrentPage(nextPage);
    }
   }
    return (
        <>
            <Modal
                title="Add User"
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name="userInfoForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                >
                    <Form.Item
                        name="parentId"
                        label="Parent Menu:"
                        
                    >
                        <Select defaultValue={"00000000-0000-0000-0000-000000000000"}>
                            <Select.Option value="00000000-0000-0000-0000-000000000000" >{"----------As Top Menu----------"}</Select.Option>
                            {allMenusInfo.map(m => <Select.Option value={m.id}>{m.menuText}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="menuText"
                        label="Menu Text:"
                        rules={[{ required: true, message: 'Please Input The MenuText!' }]}
                    >
                        <Input placeholder="Enter Menu Name" />
                    </Form.Item>

                    <Form.Item
                        name="webUrl"
                        label="Web Url:"
                        rules={[{ required: true, message: 'Please Ipunt Web Url!' }]}
                    >
                        <Input placeholder="Web Url For This Menu" />
                    </Form.Item>
                    <Form.Item 
                    label='Icon' 
                    name="icon"
                    rules={[{ required: true, message: 'Please Select Icon!' }]}
                      >
                        <Select placeholder="Select an icon" onPopupScroll={onSctoll}  >
                            {currentIcons.map(icon => (
                                <Select.Option value ={icon.key}  >
                                    <Space>
                                    {React.createElement(icon.value)}
                                    {icon.key}
                                    </Space>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default AddMenuForm;
